import { habilidades } from "@/data/perfil";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Habilidades() {
  return (
    <Seccion
      id="habilidades"
      seccion="2"
      titulo="Competencias"
      descripcion="Herramientas y prácticas que uso a diario, agrupadas por la función que cumplen."
    >
      <div className="border-t border-regla">
        {habilidades.map((grupo, i) => (
          <Revelar key={grupo.categoria} retraso={i * 60}>
            <div className="grid gap-x-10 gap-y-3 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
              <div>
                <h3 className="font-serif text-[17px] font-semibold text-tinta">
                  {grupo.categoria}
                </h3>
                <p className="mt-1 text-[13px] leading-snug text-tinta-clara">
                  {grupo.descripcion}
                </p>
              </div>
              <ul className="flex flex-wrap content-start gap-x-2 gap-y-2">
                {grupo.items.map((item) => (
                  <li
                    key={item}
                    className="border border-regla bg-papel-alto px-2.5 py-1 font-mono text-[12px] text-tinta-media"
                  >
                    {item}
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
