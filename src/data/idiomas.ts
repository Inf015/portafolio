/**
 * Los idiomas del sitio, sin nada colgando.
 *
 * Vive aparte de `contenido.ts` porque el proxy lo necesita, y la documentación de Next
 * advierte que el proxy no debe apoyarse en los módulos de render: se despliega aparte,
 * a veces en la CDN. Importando de aquí resuelve el idioma sin arrastrar consigo el
 * contenido entero del portafolio en los dos idiomas.
 */

export type Idioma = "es" | "en";

/** El orden manda: el primero es el que se sirve si el navegador no pide nada útil. */
export const IDIOMAS: Idioma[] = ["es", "en"];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as string[]).includes(valor);
}

/**
 * Resuelve el idioma que pide un navegador a partir de su cabecera `Accept-Language`.
 *
 * El navegador manda una lista de preferencias con factores de calidad, del tipo
 * `en-US,en;q=0.9,es;q=0.8`. Quedarse con el primero acierta casi siempre, pero ordenar
 * por `q` acierta también cuando el idioma preferido es uno que no se ofrece.
 *
 * Vive aquí y no en el proxy para poder probarse sin levantar un servidor.
 */
export function idiomaPreferido(cabecera: string | null): Idioma | null {
  if (!cabecera) return null;

  const preferencias = cabecera
    .split(",")
    .map((parte) => {
      const [etiqueta, ...parametros] = parte.trim().split(";");
      const q = parametros
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return {
        // `es-DO` y `en-GB` cuentan como `es` e `en`.
        base: etiqueta.trim().toLowerCase().split("-")[0],
        q: q === undefined ? 1 : Number.parseFloat(q),
      };
    })
    .filter((p) => Number.isFinite(p.q) && p.q > 0)
    .sort((a, b) => b.q - a.q);

  // El `find` con predicado de tipo no estrecha la propiedad, así que se busca aparte.
  const elegido = preferencias.find((p) => esIdioma(p.base))?.base;
  return elegido !== undefined && esIdioma(elegido) ? elegido : null;
}
