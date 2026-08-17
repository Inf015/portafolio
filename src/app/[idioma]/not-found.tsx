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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 lg:px-10">
      <div className="border-t border-tinta pt-4">
        <div className="grid gap-x-12 gap-y-4 md:grid-cols-[8rem_1fr]">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] nums-tabulares text-sello">
            Error 404
          </span>
          <div className="max-w-xl">
            <h1 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-tinta sm:text-[2.5rem]">
              {c.ui.noEncontradoTitulo}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-tinta-media">
              {c.ui.noEncontradoTexto}
            </p>
            <Link
              href={rutas.inicio(IDIOMA_POR_DEFECTO)}
              className="mt-8 inline-block bg-tinta px-6 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-papel-alto transition-colors hover:bg-sello"
            >
              {c.ui.volverAlInicio} →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
