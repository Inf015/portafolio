import Link from "next/link";
import { contenido, IDIOMA_POR_DEFECTO, rutas } from "@/data/contenido";

/*
 * La 404 no recibe los parámetros de la ruta —Next la renderiza fuera del segmento que
 * falló—, así que no puede saber el idioma. Se sirve en el idioma por defecto, con el
 * enlace de vuelta al inicio, donde el proxy vuelve a decidir según el navegador.
 */
export default function NoEncontrado() {
  const c = contenido[IDIOMA_POR_DEFECTO];

  return (
    <div className="sitio">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 lg:px-10">
        <p className="font-display text-[clamp(3.4rem,12vw,8.5rem)] font-bold leading-[0.85] tracking-[-0.05em] text-traza">
          Error 404
        </p>
        <div className="mt-8 max-w-xl">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] text-texto sm:text-[2.5rem]">
            {c.ui.noEncontradoTitulo}
          </h1>
          <p className="mt-3 text-pretty text-[17px] leading-relaxed text-tenue">
            {c.ui.noEncontradoTexto}
          </p>
          <Link
            href={rutas.inicio(IDIOMA_POR_DEFECTO)}
            className="mt-8 inline-block border border-texto bg-texto px-6 py-3 font-display text-[15px] font-semibold text-noche transition-colors hover:border-verde hover:bg-verde"
          >
            {c.ui.volverAlInicio}
          </Link>
        </div>
      </main>
    </div>
  );
}
