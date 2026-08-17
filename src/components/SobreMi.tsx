import { perfil } from "@/data/perfil";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function SobreMi() {
  return (
    <Seccion id="sobre-mi" seccion="1" titulo="Perfil">
      <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[1.7fr_1fr]">
        <Revelar>
          <div className="max-w-2xl space-y-5">
            {perfil.sobreMi.map((parrafo, i) => (
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
            src="/fotos/retrato.jpg"
            alt="Retrato de Oliver Infante, Ingeniero QA."
            numero={1}
            pie="Oliver Infante — Ingeniero QA, Santo Domingo."
            ancho={933}
            alto={1400}
            className="lg:sticky lg:top-24"
          />
        </Revelar>
      </div>
    </Seccion>
  );
}
