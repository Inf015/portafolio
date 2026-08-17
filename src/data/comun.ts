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
  mostrarTelefono: false,

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

/** Revisión del documento, que se muestra en el encabezado y en el pie. */
export const revision = "2026.08";
