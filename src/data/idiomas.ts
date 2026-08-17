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
