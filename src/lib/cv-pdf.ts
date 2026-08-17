/**
 * Genera el PDF del CV abriendo la propia página en un navegador headless.
 *
 * Por qué así y no con un archivo guardado en `public/`: un archivo hay que regenerarlo
 * y volver a subirlo cada vez que cambia el contenido, y el día que se olvide la web
 * sirve un CV viejo sin avisar. Renderizando la página en el momento, el PDF no puede
 * desincronizarse de los datos por construcción.
 *
 * Y por qué un navegador y no una librería de PDF: así el documento sale exactamente
 * igual que la página, reutilizando el CSS de impresión —el `@page`, el papel a sangre,
 * la agrupación de títulos con su primera entrada—. Con una librería habría que mantener
 * el diseño dos veces.
 */

import { existsSync } from "node:fs";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { archivoPdf, rutaCV, type IdiomaCV } from "@/data/cv";

/**
 * En Vercel no hay navegador instalado: lo aporta @sparticuz/chromium, compilado para
 * el entorno de las funciones. En local se usa el que ya esté en la máquina, porque ese
 * paquete trae un binario de Linux que en un escritorio no arranca.
 */
const enFuncionServerless = Boolean(
  process.env.AWS_LAMBDA_FUNCTION_VERSION ?? process.env.VERCEL,
);

const NAVEGADORES_LOCALES = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

async function configuracionNavegador() {
  if (enFuncionServerless) {
    // Un CV es texto: sin WebGL el arranque en frío es más corto porque ni siquiera
    // se descomprime la pila gráfica.
    chromium.setGraphicsMode = false;

    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
      defaultViewport: { width: 1200, height: 1600 },
    };
  }

  /*
   * `turbopackIgnore` porque la ruta es dinámica y, sin la marca, el empaquetador intenta
   * rastrear el sistema de archivos y arrastrar lo que encuentre al despliegue. Esta rama
   * solo corre en desarrollo: en Vercel el binario lo pone @sparticuz/chromium más arriba.
   */
  const local = NAVEGADORES_LOCALES.filter(
    (ruta) => ruta && existsSync(/* turbopackIgnore: true */ ruta),
  );
  if (local.length === 0) {
    throw new Error(
      "No encontré un navegador basado en Chromium para generar el PDF. " +
        "Instala Chrome, Brave, Edge o Chromium, o define CHROME_BIN con la ruta del binario.",
    );
  }

  return {
    executablePath: local[0] as string,
    args: ["--no-sandbox", "--disable-background-networking", "--disable-sync"],
    defaultViewport: { width: 1200, height: 1600 },
  };
}

async function generarPdf(idioma: IdiomaCV, origen: string) {
  const navegador = await puppeteer.launch({
    ...(await configuracionNavegador()),
    headless: true,
  });

  try {
    const pagina = await navegador.newPage();
    await pagina.goto(`${origen}${rutaCV[idioma]}`, {
      waitUntil: "networkidle0",
      timeout: 30_000,
    });

    // Las tipografías se sirven desde el mismo origen. Sin esperarlas, el documento se
    // maqueta con el tipo del sistema y el PDF sale con otra métrica y otra paginación.
    await pagina.evaluate(() => document.fonts.ready);

    return await pagina.pdf({
      printBackground: true,
      // Respeta el `@page { size: A4; margin: 14mm 15mm }` de globals.css en vez de
      // imponer un tamaño desde aquí: el papel se define en un solo sitio.
      preferCSSPageSize: true,
    });
  } finally {
    await navegador.close();
  }
}

/**
 * El origen público desde el que el navegador headless debe abrir la página.
 * Detrás del proxy de Vercel, `request.url` apunta al destino interno, así que la
 * dirección real viaja en las cabeceras reenviadas.
 */
function origenPublico(peticion: Request) {
  const cabeceras = peticion.headers;
  const anfitrion =
    cabeceras.get("x-forwarded-host") ??
    cabeceras.get("host") ??
    new URL(peticion.url).host;
  const protocolo =
    cabeceras.get("x-forwarded-proto") ??
    (anfitrion.startsWith("localhost") ? "http" : "https");

  return `${protocolo}://${anfitrion}`;
}

/** Respuesta compartida por las rutas `/cv/pdf` y `/cv/en/pdf`. */
export async function respuestaPdfCV(peticion: Request, idioma: IdiomaCV) {
  const pdf = await generarPdf(idioma, origenPublico(peticion));

  // Copia a un Uint8Array respaldado por un ArrayBuffer normal: lo que puppeteer devuelve
  // puede apoyarse en un SharedArrayBuffer, que no vale como cuerpo de respuesta.
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      // El nombre acaba en el disco de quien lo descarga: que se entienda sin abrirlo.
      "Content-Disposition": `attachment; filename="${archivoPdf[idioma]}"`,
      /*
       * Arrancar un Chromium por descarga sería absurdo. La CDN guarda el resultado y lo
       * reparte; cada despliegue invalida la caché, así que un cambio de contenido se ve
       * en la siguiente descarga sin que haya nada que purgar a mano.
       */
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
