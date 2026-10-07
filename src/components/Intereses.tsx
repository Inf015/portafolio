import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Intereses({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="intereses" {...c.secciones.intereses}>
      <div className="mb-10 grid items-start gap-6 md:grid-cols-[1fr_1.35fr]">
        <Revelar>
          <Figura
            figura={c.figuras.telemetria}
            ui={c.ui}
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </Revelar>
        <Revelar retraso={80}>
          <Figura
            figura={c.figuras.pista}
            ui={c.ui}
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </Revelar>
      </div>

      <div className="grid gap-px border border-borde-2 bg-borde-2 sm:grid-cols-2">
        {c.intereses.map((interes, i) => (
          <Revelar key={interes.titulo} retraso={i * 60} className="h-full">
            <div className="h-full bg-panel p-6">
              <h3 className="font-display text-[1.3rem] font-bold leading-tight tracking-[-0.01em] text-texto">
                {interes.titulo}
              </h3>
              <p className="mt-3 text-pretty text-[16px] leading-[1.7] text-[#c3cee0]">
                {interes.detalle}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 border-t border-borde pt-4">
                {interes.datos.map((dato) => (
                  <li
                    key={dato}
                    className="border border-borde-2 px-2.5 py-0.5 font-display text-[13.5px] font-medium text-tenue"
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
