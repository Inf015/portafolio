import type { MetadataRoute } from "next";
import { SITIO } from "@/data/comun";

/**
 * El CV queda fuera del índice: es el mismo contenido que la portada y competiría con
 * ella. Su ruta de PDF, además, arranca un navegador por petición — no conviene que un
 * rastreador la descubra y la pida en bucle.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/es/cv", "/en/cv"],
    },
    sitemap: `${SITIO}/sitemap.xml`,
  };
}
