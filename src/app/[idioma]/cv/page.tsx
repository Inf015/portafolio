import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentoCV } from "@/components/DocumentoCV";
import { contenido, esIdioma, rutas } from "@/data/contenido";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ idioma: string }>;
}): Promise<Metadata> {
  const { idioma } = await params;
  if (!esIdioma(idioma)) return {};

  const { cv } = contenido[idioma];
  return {
    title: cv.tituloPagina,
    description: cv.descripcionPagina,
    // Es el mismo contenido que la portada: no conviene competir con ella en buscadores.
    robots: { index: false, follow: true },
    alternates: {
      canonical: rutas.cv(idioma),
      languages: { es: rutas.cv("es"), en: rutas.cv("en") },
    },
  };
}

export default async function PaginaCV({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) notFound();

  return <DocumentoCV idioma={idioma} />;
}
