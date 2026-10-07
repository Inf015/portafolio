import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Experiencia({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="experiencia" {...c.secciones.experiencia}>
      <ol className="border-t border-borde-2">
        {c.experiencia.map((puesto, i) => (
          <li key={`${puesto.empresa}-${puesto.puesto}`}>
            <Revelar retraso={i * 70}>
              <article className="grid gap-x-12 gap-y-4 border-b border-borde py-8 md:grid-cols-[13rem_1fr]">
                <div>
                  <p className="font-display text-[15px] font-medium tabular-nums text-tenue">
                    {puesto.periodo}
                  </p>
                  {puesto.actual && (
                    <span className="mt-2 inline-block border border-verde px-2.5 py-0.5 font-display text-[13px] font-semibold text-verde">
                      {c.ui.enCurso}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.02em] text-texto">
                    {puesto.puesto}
                  </h3>
                  <p className="mt-1 text-[16px] text-tenue">{puesto.empresa}</p>

                  <ul className="mt-5 space-y-3">
                    {puesto.logros.map((logro) => (
                      <li
                        key={logro.slice(0, 32)}
                        className="flex gap-3.5 text-[16.5px] leading-[1.7] text-[#c3cee0]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[13px] h-px w-3 shrink-0 bg-traza"
                        />
                        <span className="text-pretty">{logro}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {puesto.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-borde-2 px-2.5 py-0.5 font-display text-[13.5px] font-medium text-tenue"
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
