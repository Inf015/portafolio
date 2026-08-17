import { beforeAll, describe, expect, it } from "vitest";
import { IDIOMAS } from "@/data/idiomas";

/**
 * Pruebas de humo contra un sitio levantado. No sustituyen a las unitarias: comprueban lo
 * que solo existe cuando todo está montado —el proxy, las redirecciones, las cabeceras y
 * el PDF—, que es justo donde han aparecido los fallos de este proyecto.
 *
 *   npm run build && npm start           # o `npm run dev`
 *   npm run test:humo
 *
 * Contra producción:  BASE=https://www.oliver-infante.dev npm run test:humo
 */

const BASE = process.env.BASE ?? "http://localhost:3000";

/** Sin seguir redirecciones: el código y el destino son parte de lo que se prueba. */
const pedir = (ruta: string, cabeceras: HeadersInit = {}) =>
  fetch(`${BASE}${ruta}`, { redirect: "manual", headers: cabeceras });

const destino = (respuesta: Response) =>
  (respuesta.headers.get("location") ?? "").replace(BASE, "");

beforeAll(async () => {
  try {
    await fetch(BASE, { redirect: "manual" });
  } catch {
    throw new Error(
      `No hay nada escuchando en ${BASE}. Levanta el sitio antes de correr estas pruebas.`,
    );
  }
});

describe("la raíz reparte según el navegador", () => {
  it.each([
    ["en-US,en;q=0.9", "/en"],
    ["es-DO,es;q=0.9", "/es"],
    // Idioma que no ofrecemos: cae en el de por defecto en vez de dar 404.
    ["fr-FR,fr;q=0.9", "/es"],
    // El primero pesa menos que el segundo; gana el segundo.
    ["de;q=0.7,en;q=0.9", "/en"],
  ])("con Accept-Language %s va a %s", async (idioma, esperado) => {
    const r = await pedir("/", { "Accept-Language": idioma });
    expect(r.status).toBe(307);
    expect(destino(r)).toBe(esperado);
  });

  it("sin cabecera alguna, sirve el idioma por defecto", async () => {
    const r = await pedir("/");
    expect(destino(r)).toBe("/es");
  });
});

describe("las rutas de la versión anterior siguen funcionando", () => {
  // Estuvieron públicas antes de que el sitio fuera bilingüe y pueden estar compartidas.
  it.each([
    ["/cv", "/es/cv"],
    ["/cv/en", "/en/cv"],
    ["/cv/pdf", "/es/cv/pdf"],
    ["/cv/en/pdf", "/en/cv/pdf"],
  ])("%s redirige a %s", async (vieja, nueva) => {
    const r = await pedir(vieja);
    expect(r.status).toBeGreaterThanOrEqual(300);
    expect(destino(r)).toBe(nueva);
  });
});

describe.each(IDIOMAS)("el sitio en %s", (idioma) => {
  it("la portada responde y declara su idioma", async () => {
    const r = await pedir(`/${idioma}`);
    expect(r.status).toBe(200);
    expect(await r.text()).toContain(`<html lang="${idioma}"`);
  });

  it("el CV responde", async () => {
    expect((await pedir(`/${idioma}/cv`)).status).toBe(200);
  });

  it("el CV pide no ser indexado", async () => {
    // Repite el contenido de la portada: indexarlo la haría competir consigo misma.
    const html = await (await pedir(`/${idioma}/cv`)).text();
    expect(html).toMatch(/name="robots"[^>]*content="[^"]*noindex/);
  });

  it("declara la otra versión con hreflang", async () => {
    const html = await (await pedir(`/${idioma}`)).text();
    for (const otro of IDIOMAS) {
      expect(html.toLowerCase()).toContain(`hreflang="${otro}"`);
    }
  });

  it("ofrece imagen al compartir el enlace", async () => {
    const html = await (await pedir(`/${idioma}`)).text();
    expect(html).toMatch(/property="og:image"/);

    const r = await pedir(`/${idioma}/opengraph-image`);
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toContain("image/png");
  });
});

describe("el PDF del CV", () => {
  // Arranca un Chromium: es la ruta más lenta y la que más veces se ha roto.
  it.each(IDIOMAS)("se genera en %s", async (idioma) => {
    const r = await pedir(`/${idioma}/cv/pdf`);
    expect(r.status).toBe(200);
    expect(r.headers.get("content-type")).toContain("application/pdf");
    expect(r.headers.get("content-disposition")).toContain(".pdf");

    const bytes = new Uint8Array(await r.arrayBuffer());
    // Un PDF real empieza por %PDF; un 200 con cuerpo vacío o HTML no vale.
    expect(new TextDecoder().decode(bytes.slice(0, 4))).toBe("%PDF");
    expect(bytes.byteLength).toBeGreaterThan(10_000);
  }, 120_000);
});

describe("lo que buscan los rastreadores", () => {
  it("robots.txt existe y apunta al sitemap", async () => {
    const r = await pedir("/robots.txt");
    expect(r.status).toBe(200);
    expect(await r.text()).toContain("Sitemap:");
  });

  it("el sitemap lista las dos portadas y ninguna página del CV", async () => {
    const xml = await (await pedir("/sitemap.xml")).text();
    for (const idioma of IDIOMAS) expect(xml).toContain(`/${idioma}</loc>`);
    expect(xml).not.toContain("/cv");
  });
});

describe("una ruta inexistente", () => {
  it("responde 404 con la página del documento, no con la genérica", async () => {
    const r = await pedir("/es/no-existe");
    expect(r.status).toBe(404);
    const html = await r.text();
    expect(html).toContain("Error 404");
    expect(html).not.toContain("<title>404: This page could not be found.</title>");
  });
});

describe("cabeceras de seguridad", () => {
  it("el sitio manda una CSP que cierra las vías que no dependen de scripts", async () => {
    const csp = (await pedir("/es")).headers.get("content-security-policy") ?? "";
    for (const directiva of [
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "connect-src 'self'",
    ]) {
      expect(csp).toContain(directiva);
    }
  });

  it.each([
    ["x-frame-options", "DENY"],
    ["x-content-type-options", "nosniff"],
    ["referrer-policy", "strict-origin-when-cross-origin"],
  ])("manda %s", async (cabecera, valor) => {
    expect((await pedir("/es")).headers.get(cabecera)).toBe(valor);
  });

  it("niega permisos de dispositivo que el sitio no usa", async () => {
    const p = (await pedir("/es")).headers.get("permissions-policy") ?? "";
    for (const permiso of ["camera=()", "microphone=()", "geolocation=()"]) {
      expect(p).toContain(permiso);
    }
  });
});
