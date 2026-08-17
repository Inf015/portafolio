/**
 * Punto de entrada del contenido. Los componentes importan de aquí, nunca de `es.ts`
 * o `en.ts` directamente: así ninguno queda atado a un idioma.
 */

import { en } from "./en";
import { es } from "./es";
import type { Idioma } from "./idiomas";
import type { Contenido } from "./tipos";

export {
  esIdioma,
  IDIOMA_POR_DEFECTO,
  IDIOMAS,
  type Idioma,
} from "./idiomas";
export type { Contenido };

export const contenido: Record<Idioma, Contenido> = { es, en };

/** Rutas del sitio para un idioma dado. Todas llevan prefijo, incluido el español. */
export const rutas = {
  inicio: (idioma: Idioma) => `/${idioma}`,
  cv: (idioma: Idioma) => `/${idioma}/cv`,
  pdf: (idioma: Idioma) => `/${idioma}/cv/pdf`,
};

/** Sustituye los marcadores `{rev}` y similares de las cadenas de interfaz. */
export function conValores(plantilla: string, valores: Record<string, string>) {
  return plantilla.replace(/\{(\w+)\}/g, (coincidencia, clave) =>
    clave in valores ? valores[clave] : coincidencia,
  );
}
