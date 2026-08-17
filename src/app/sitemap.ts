import type { MetadataRoute } from "next";
import { SITIO } from "@/data/comun";
import { IDIOMAS, rutas } from "@/data/contenido";

/**
 * Solo el portafolio. El CV queda fuera a propósito: lleva `noindex` porque repite el
 * contenido de la portada, y anunciarlo en el sitemap sería pedirle a un buscador que
 * indexe justo lo que la página le dice que no indexe.
 *
 * Cada entrada declara sus alternativas de idioma, para que las dos versiones se
 * entiendan como la misma página traducida y no como contenido duplicado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return IDIOMAS.map((idioma) => ({
    url: `${SITIO}${rutas.inicio(idioma)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        IDIOMAS.map((otro) => [otro, `${SITIO}${rutas.inicio(otro)}`]),
      ),
    },
  }));
}
