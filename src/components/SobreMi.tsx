import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function SobreMi({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="sobre-mi" seccion="1" {...c.secciones.perfil}>
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[1.7fr_1fr]">
        <Revelar>
          <div className="max-w-2xl space-y-5">
            {c.sobreMi.map((parrafo, i) => (
              <p
                key={parrafo.slice(0, 32)}
                className={
                  i === 0
                    ? "font-serif text-xl leading-[1.6] text-tinta"
                    : "text-pretty text-[15px] leading-[1.8] text-tinta-media"
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
            className="lg:sticky lg:top-24"
          />
        </Revelar>
      </div>
    </Seccion>
  );
}
