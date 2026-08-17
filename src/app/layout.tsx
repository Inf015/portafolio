import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { perfil } from "@/data/perfil";
import "./globals.css";

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

// TODO: reemplazar por el dominio real una vez desplegado.
const sitio = "https://oliverinfante.dev";

const descripcion = `${perfil.titulo} en ${perfil.ubicacion}. Pruebas manuales, casos de prueba funcionales, suites de regresión y seguimiento de errores, con base sólida en desarrollo de software.`;

export const metadata: Metadata = {
  metadataBase: new URL(sitio),
  title: {
    default: `${perfil.nombre} — ${perfil.titulo}`,
    template: `%s · ${perfil.nombre}`,
  },
  description: descripcion,
  keywords: [
    "QA",
    "Ingeniero QA",
    "Quality Assurance",
    "Pruebas manuales",
    "Testing",
    "ISTQB",
    "Azure DevOps",
    "República Dominicana",
    perfil.nombre,
  ],
  authors: [{ name: perfil.nombre, url: sitio }],
  creator: perfil.nombre,
  openGraph: {
    type: "profile",
    locale: "es_DO",
    url: sitio,
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: descripcion,
    siteName: `${perfil.nombre} · Portafolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${perfil.nombre} — ${perfil.titulo}`,
    description: descripcion,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // `suppressHydrationWarning`: el script del <head> agrega la clase `js` antes de la
  // hidratación, así que el HTML del servidor y el del cliente difieren a propósito.
  return (
    <html lang="es" suppressHydrationWarning>
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
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
