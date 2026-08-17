import type { Metadata } from "next";
import { DocumentoCV } from "@/components/DocumentoCV";
import { cv, rutaCV } from "@/data/cv";

export const metadata: Metadata = {
  title: cv.en.etiquetas.tituloPagina,
  description: cv.en.etiquetas.descripcionPagina,
  // Mismo criterio que la versión en español: no compite en buscadores con la portada.
  robots: { index: false, follow: true },
  alternates: {
    canonical: rutaCV.en,
    languages: { es: rutaCV.es, en: rutaCV.en },
  },
  openGraph: { locale: "en_US" },
};

export default function CVEnIngles() {
  return <DocumentoCV idioma="en" />;
}
