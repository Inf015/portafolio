import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Experiencia({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="experiencia" seccion="4" {...c.secciones.experiencia}>
      <ol className="border-t border-regla">
        {c.experiencia.map((puesto, i) => (
          <li key={`${puesto.empresa}-${puesto.puesto}`}>
            <Revelar retraso={i * 70}>
              <article className="grid gap-x-10 gap-y-4 border-b border-regla-fina py-8 md:grid-cols-[13rem_1fr]">
                <div>
                  <p className="font-mono text-[12px] nums-tabulares text-tinta-media">
                    {puesto.periodo}
                  </p>
                  {puesto.actual && (
                    <span className="mt-2 inline-block border border-sello px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sello">
                      {c.ui.enCurso}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-[22px] font-semibold leading-tight tracking-[-0.01em] text-tinta">
                    {puesto.puesto}
                  </h3>
                  <p className="mt-1 text-[14px] text-tinta-clara">
                    {puesto.empresa}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {puesto.logros.map((logro) => (
                      <li
                        key={logro.slice(0, 32)}
                        className="flex gap-3 text-[15px] leading-[1.7] text-tinta-media"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[11px] h-px w-3 shrink-0 bg-regla"
                        />
                        <span className="text-pretty">{logro}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    {puesto.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[11px] uppercase tracking-[0.08em] text-tinta-clara"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Revelar>
          </li>
        ))}
      </ol>
    </Seccion>
  );
}
