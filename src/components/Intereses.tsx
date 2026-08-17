import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Intereses({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="intereses" seccion="7" {...c.secciones.intereses}>
      <div className="mb-10 grid items-start gap-6 sm:grid-cols-[1fr_1.5fr]">
        <Revelar>
          <Figura figura={c.figuras.piloto} ui={c.ui} />
        </Revelar>

        <Revelar retraso={80}>
          <Figura figura={c.figuras.pista} ui={c.ui} />
        </Revelar>
      </div>

      <div className="grid gap-px border border-regla bg-regla sm:grid-cols-2">
        {c.intereses.map((interes, i) => (
          <Revelar key={interes.titulo} retraso={i * 60}>
            <div className="h-full bg-papel-alto p-6">
              <h3 className="font-serif text-[19px] font-semibold text-tinta">
                {interes.titulo}
              </h3>
              <p className="mt-2.5 text-pretty text-[14px] leading-[1.7] text-tinta-media">
                {interes.detalle}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-regla-fina pt-3">
                {interes.datos.map((dato) => (
                  <li
                    key={dato}
                    className="font-mono text-[11px] uppercase tracking-[0.08em] text-tinta-clara"
                  >
                    {dato}
                  </li>
                ))}
              </ul>
            </div>
          </Revelar>
        ))}
      </div>
    </Seccion>
  );
}
