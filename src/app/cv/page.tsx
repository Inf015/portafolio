import type { Metadata } from "next";
import { DocumentoCV } from "@/components/DocumentoCV";
import { cv, rutaCV } from "@/data/cv";

export const metadata: Metadata = {
  title: cv.es.etiquetas.tituloPagina,
  description: cv.es.etiquetas.descripcionPagina,
  // Es el mismo contenido que la portada: no conviene competir con ella en buscadores.
  robots: { index: false, follow: true },
  alternates: {
    canonical: rutaCV.es,
    languages: { es: rutaCV.es, en: rutaCV.en },
  },
};

export default function CV() {
  return <DocumentoCV idioma="es" />;
}
