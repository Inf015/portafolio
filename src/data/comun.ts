/**
 * Lo que no se traduce: identidad, formas de contacto y los archivos de imagen.
 *
 * Vive aparte de `es.ts` y `en.ts` a propósito. Un correo o una URL repetidos en dos
 * idiomas son dos sitios donde equivocarse al cambiarlos; aquí hay uno solo.
 */

export const perfil = {
  nombre: "Oliver Infante",
  email: "oliver_jose@live.com",

  /*
   * El teléfono no vive en el repositorio: es público, y un número en el código lo
   * encuentran los rastreadores de spam aunque el sitio nunca lo muestre.
   *
   * Para incluirlo, defínelo como NEXT_PUBLIC_TELEFONO en `.env.local` —que git ignora—
   * y en Vercel como variable de entorno, y pon `mostrarTelefono` en true.
   */
  telefono: process.env.NEXT_PUBLIC_TELEFONO ?? "",
  mostrarTelefono: true,

  // Sin `www` ni barra final: el CV lo muestra tal cual, quitándole solo el esquema.
  linkedin: "https://linkedin.com/in/oliver-infante-perez",
  github: "https://github.com/Inf015",

  disponible: true,
};

/**
 * Las imágenes del documento. Cada idioma referencia estas claves y aporta su propio
 * texto alternativo y su pie, que sí se traducen.
 */
export const imagenes = {
  retrato: { src: "/fotos/retrato.jpg", ancho: 933, alto: 1400 },
  telemetria: {
    src: "/fotos/telemetria.jpg",
    ancho: 1600,
    alto: 1066,
    credito: "Davide Morillo",
  },
  piloto: { src: "/fotos/piloto.jpg", ancho: 933, alto: 1400 },
  pista: {
    src: "/fotos/pista.jpg",
    ancho: 1600,
    alto: 1066,
    credito: "Davide Morillo",
  },
  "botqa-reporte": { src: "/capturas/botqa-reporte.jpg", ancho: 1200, alto: 911 },
  "delta-telemetria": {
    src: "/capturas/delta-telemetria.jpg",
    ancho: 1400,
    alto: 687,
  },
  "delta-reporte": { src: "/capturas/delta-reporte.jpg", ancho: 1400, alto: 880 },
} as const;

export type ClaveImagen = keyof typeof imagenes;

/**
 * El dominio canónico. Con `www`: el apex redirige aquí con un 308, así que usar el apex
 * haría que cada rastreador pasara antes por un salto al leer los metadatos.
 */
export const SITIO = "https://www.oliver-infante.dev";

/** Revisión del documento, que se muestra en el encabezado y en el pie. */
export const revision = "2026.10";

/**
 * Resultado de la última ejecución de las suites, medido de verdad (no contado en el
 * código). Es la fuente única de las cifras de la traza y del titular: los textos
 * traducidos no repiten estos números.
 *
 * Al volver a ejecutar las suites, actualizar aquí `fecha` y los conteos. Están
 * ordenadas de mayor a menor, que es el orden en que se dibuja la traza acumulada.
 */
export const ejecucion = {
  fecha: "2026-10-07",
  suites: [
    { nombre: "Kepubli", pruebas: 1013 },
    { nombre: "La Infantería", pruebas: 288 },
    { nombre: "Tara", pruebas: 205 },
    { nombre: "Delta", pruebas: 100 },
    { nombre: "botqa", pruebas: 75 },
    { nombre: "Panel de control", pruebas: 38 },
  ],
  fallidas: 0,
  /** Las cuatro del lanzador del panel, que usa /proc y solo corre en Linux. */
  omitidas: 4,
} as const;

/** Total de pruebas aprobadas: la suma de las suites, nunca un número escrito a mano. */
export const totalAprobadas = ejecucion.suites.reduce(
  (suma, suite) => suma + suite.pruebas,
  0,
);
