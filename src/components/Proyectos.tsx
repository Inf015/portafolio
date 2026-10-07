import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

/**
 * Cada caso muestra primero lo que decide en diez segundos —nombre, estado, resumen y la
 * cifra de pruebas que lo respalda— y deja el detalle y la evidencia desplegables. Los
 * casos con capturas arrancan abiertos: ver el reporte vale más que leer sobre él.
 */
export function Proyectos({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="proyectos" {...c.secciones.proyectos}>
      <div className="border-t border-borde-2">
        {c.proyectos.map((proyecto, i) => (
          <Revelar key={proyecto.nombre} retraso={i * 50}>
            <article className="border-b border-borde py-8 sm:py-10">
              <div className="grid gap-x-10 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_11rem]">
                <div>
                  <p className="font-display text-[13.5px] font-semibold text-traza">
                    {proyecto.estado ??
                      (proyecto.destacado ? c.ui.destacado : c.ui.personal)}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.6rem,2.8vw,2.1rem)] font-bold leading-[1.05] tracking-[-0.025em] text-texto">
                    {proyecto.nombre}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-snug text-tenue">
                    {proyecto.rol}
                  </p>
                </div>

                <p className="max-w-[60ch] text-pretty text-[16.5px] leading-[1.7] text-[#c3cee0]">
                  {proyecto.resumen}
                </p>

                {proyecto.cifra && (
                  <p className="md:text-right">
                    <span className="block font-display text-[clamp(2.6rem,4.6vw,3.4rem)] font-bold leading-none tracking-[-0.04em] tabular-nums text-verde">
                      {proyecto.cifra.valor}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-tenue">
                      {proyecto.cifra.nota}
                    </span>
                  </p>
                )}
              </div>

              <details open={Boolean(proyecto.figuras)} className="group mt-6">
                <summary className="inline-flex cursor-pointer items-center gap-2 font-display text-[14.5px] font-semibold text-traza transition-colors hover:text-texto">
                  {c.ui.verDetalle}
                  <svg
                    className="flecha h-3.5 w-3.5 transition-transform"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </summary>

                <div className="mt-5 border-l-2 border-borde-2 pl-5 sm:pl-7">
                  <ul className="space-y-3">
                    {proyecto.detalles.map((detalle, j) => (
                      <li
                        key={detalle.slice(0, 32)}
                        className="flex gap-4 text-[16px] leading-[1.7] text-[#c3cee0]"
                      >
                        <span className="font-display text-[13px] font-semibold tabular-nums leading-[2] text-tenue">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-pretty">{detalle}</span>
                      </li>
                    ))}
                  </ul>

                  {proyecto.figuras && (
                    <div className="mt-7 grid gap-6 lg:grid-cols-2">
                      {proyecto.figuras.map((figura) => (
                        <Figura key={figura.recurso} figura={figura} ui={c.ui} />
                      ))}
                    </div>
                  )}

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2">
                      {proyecto.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-borde-2 px-2.5 py-0.5 font-display text-[13.5px] font-medium text-tenue"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    {proyecto.enlace && (
                      <a
                        href={proyecto.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-[14.5px] font-semibold text-traza underline decoration-traza/40 underline-offset-4 transition-colors hover:text-texto hover:decoration-texto"
                      >
                        {c.ui.verProyecto} ↗
                      </a>
                    )}
                  </div>
                </div>
              </details>
            </article>
          </Revelar>
        ))}
      </div>
    </Seccion>
  );
}
