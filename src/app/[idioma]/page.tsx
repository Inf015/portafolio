import { notFound } from "next/navigation";
import { ComoTrabajo } from "@/components/ComoTrabajo";
import { Contacto, Footer } from "@/components/Contacto";
import { Experiencia } from "@/components/Experiencia";
import { Formacion } from "@/components/Formacion";
import { Habilidades } from "@/components/Habilidades";
import { Hero } from "@/components/Hero";
import { Intereses } from "@/components/Intereses";
import { Nav } from "@/components/Nav";
import { Proyectos } from "@/components/Proyectos";
import { SobreMi } from "@/components/SobreMi";
import { Traza } from "@/components/Traza";
import { esIdioma } from "@/data/contenido";

export default async function Inicio({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  if (!esIdioma(idioma)) notFound();

  return (
    <div className="sitio">
      <Nav idioma={idioma} />
      <main id="contenido">
        <Hero idioma={idioma} />
        <Traza idioma={idioma} />
        <SobreMi idioma={idioma} />
        <Habilidades idioma={idioma} />
        <ComoTrabajo idioma={idioma} />
        <Experiencia idioma={idioma} />
        <Proyectos idioma={idioma} />
        <Formacion idioma={idioma} />
        <Intereses idioma={idioma} />
        <Contacto idioma={idioma} />
      </main>
      <Footer idioma={idioma} />
    </div>
  );

}
