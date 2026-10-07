import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function SobreMi({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="sobre-mi" {...c.secciones.perfil}>
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[1.5fr_1fr]">
        <Revelar>
          <div className="max-w-[62ch] space-y-5">
            {c.sobreMi.map((parrafo, i) => (
              <p
                key={parrafo.slice(0, 32)}
                className={
                  i === 0
                    ? "text-pretty font-display text-[1.3rem] font-medium leading-[1.5] text-texto sm:text-[1.5rem]"
                    : "text-pretty text-[17px] leading-[1.75] text-tenue"
                }
              >
                {parrafo}
              </p>
            ))}
          </div>
        </Revelar>

        <Revelar retraso={120}>
          <Figura
            figura={c.figuras.retrato}
            ui={c.ui}
            sizes="(max-width: 1024px) 90vw, 400px"
            className="mx-auto max-w-md lg:sticky lg:top-24 lg:max-w-none"
          />
        </Revelar>
      </div>
    </Seccion>
  );
}
