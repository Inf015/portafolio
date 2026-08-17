import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { perfil } from "@/data/comun";
import { contenido, esIdioma, IDIOMAS, rutas } from "@/data/contenido";
import "../globals.css";

/*
 * Este es el layout raíz del sitio: no hay `app/layout.tsx`. Cuando todas las rutas
 * cuelgan de un segmento dinámico, Next toma el layout de ese segmento como raíz, que es
 * la única forma de poner el idioma en el <html> — un layout raíz no recibe parámetros.
 */

/*
 * IBM Plex: una familia diseñada para documentación de ingeniería. La serif aporta
 * autoridad editorial, la mono se usa para todo lo que es dato o metadato.
 */
const plexSerif = IBM_Plex_Serif({
  variable: "--fuente-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--fuente-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--fuente-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sitio = "https://www.oliver-infante.dev";

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  const c = contenido[idioma];
  const descripcion =
    idioma === "es"
      ? `${c.titulo} en ${c.ubicacion}. Pruebas manuales, casos de prueba funcionales, suites de regresión y seguimiento de errores, con base sólida en desarrollo de software.`
      : `${c.titulo} in ${c.ubicacion}. Manual testing, functional test cases, regression suites and defect tracking, on a solid software development foundation.`;

  return {
    metadataBase: new URL(sitio),
    title: {
      default: `${perfil.nombre} — ${c.titulo}`,
      template: `%s · ${perfil.nombre}`,
    },
    description: descripcion,
    keywords: [
      "QA",
      c.titulo,
      "Quality Assurance",
      "Testing",
      "ISTQB",
      "Azure DevOps",
      c.ubicacion,
      perfil.nombre,
    ],
    authors: [{ name: perfil.nombre, url: sitio }],
    creator: perfil.nombre,
    alternates: {
      canonical: rutas.inicio(idioma),
      // `hreflang` para que un buscador entienda que son la misma página en dos idiomas
      // y no dos contenidos compitiendo entre sí.
      languages: { es: rutas.inicio("es"), en: rutas.inicio("en") },
    },
    openGraph: {
      type: "profile",
      locale: idioma === "es" ? "es_DO" : "en_US",
      url: `${sitio}${rutas.inicio(idioma)}`,
      title: `${perfil.nombre} — ${c.titulo}`,
      description: descripcion,
      siteName: `${perfil.nombre} · ${c.ui.encabezadoDocumento}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${perfil.nombre} — ${c.titulo}`,
      description: descripcion,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LayoutRaiz({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ idioma: string }> }>) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) notFound();

  const c = contenido[idioma];

  // `suppressHydrationWarning`: el script del <head> agrega la clase `js` antes de la
  // hidratación, así que el HTML del servidor y el del cliente difieren a propósito.
  return (
    <html lang={c.lang} suppressHydrationWarning>
      <head>
        {/*
         * Marca el documento como "con JavaScript" antes del primer pintado, para que
         * las animaciones de entrada solo oculten contenido cuando puedan revelarlo.
         *
         * El temporizador es la red de seguridad: si React no llega a hidratar —un chunk
         * que falla, una red que se corta, recursos bloqueados por otro origen— nadie
         * revelaría nada y la página quedaría invisible. Al montar, `Revelar` cancela
         * este temporizador; si nunca monta, el contenido se muestra igual.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');window.__revelarFailsafe=setTimeout(function(){document.documentElement.classList.add('forzar-visible')},2500)`,
          }}
        />
      </head>
      <body
        className={`${plexSerif.variable} ${plexSans.variable} ${plexMono.variable}`}
      >
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-sello focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-papel-alto"
        >
          {c.ui.saltarAlContenido}
        </a>
        {children}
      </body>
    </html>
  );
}
