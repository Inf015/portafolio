import { intereses } from "@/data/perfil";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Intereses() {
  return (
    <Seccion
      id="intereses"
      seccion="7"
      titulo="Fuera del código"
      descripcion="De acá viene la mentalidad de medir todo. No es relleno: es el mismo método aplicado a otras cosas."
    >
      <div className="mb-10 grid items-start gap-6 sm:grid-cols-[1fr_1.5fr]">
        <Revelar>
          <Figura
            src="/fotos/piloto.jpg"
            alt="Oliver Infante con traje de competencia, sosteniendo el casco frente a un Corvette en el circuito."
            numero={6}
            pie="Jornada de pista con el equipo."
            ancho={933}
            alto={1400}
          />
        </Revelar>

        <Revelar retraso={80}>
          <Figura
            src="/fotos/pista.jpg"
            alt="Ford Mustang negro haciendo el burnout previo a una pasada de cuarto de milla, con la pista mojada y humo de neumáticos."
            numero={7}
            pie="Burnout previo a la pasada: calentar el neumático es parte del procedimiento, no espectáculo."
            credito="Davide Morillo"
            ancho={1600}
            alto={1066}
          />
        </Revelar>
      </div>

      <div className="grid gap-px border border-regla bg-regla sm:grid-cols-2">
        {intereses.map((interes, i) => (
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
