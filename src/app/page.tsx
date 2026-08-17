import { ComoTrabajo } from "@/components/ComoTrabajo";
import { Contacto, Footer } from "@/components/Contacto";
import { Experiencia } from "@/components/Experiencia";
import { Formacion } from "@/components/Formacion";
import { Habilidades } from "@/components/Habilidades";
import { Hero } from "@/components/Hero";
import { Intereses } from "@/components/Intereses";
import { Nav } from "@/components/Nav";
import { Paralelo } from "@/components/Paralelo";
import { Proyectos } from "@/components/Proyectos";
import { SobreMi } from "@/components/SobreMi";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <SobreMi />
        {/* Bloque invertido: corta el documento a la mitad y fija el argumento del sitio. */}
        <Paralelo />
        <Habilidades />
        <ComoTrabajo />
        <Experiencia />
        <Proyectos />
        <Formacion />
        <Intereses />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
