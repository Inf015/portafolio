import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

/**
 * La ficha de modificaciones: lo que uso, agrupado por la función que cumple. El primer
 * grupo (QA y pruebas) va resaltado porque es el núcleo del trabajo, no un grupo más.
 */
export function Habilidades({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="habilidades" {...c.secciones.habilidades}>
      <dl className="border-t border-borde-2">
        {c.habilidades.map((grupo, i) => (
          <Revelar key={grupo.categoria} retraso={i * 50}>
            <div className="grid gap-x-12 gap-y-3 border-b border-borde py-6 md:grid-cols-[15rem_1fr]">
              <div>
                <dt className="font-display text-[1.35rem] font-bold leading-tight tracking-[-0.01em] text-texto">
                  {grupo.categoria}
                </dt>
                <p className="mt-1.5 text-[14.5px] leading-snug text-tenue">
                  {grupo.descripcion}
                </p>
              </div>
              <dd>
                <ul className="flex flex-wrap content-start gap-x-2.5 gap-y-2.5">
                  {grupo.items.map((item) => (
                    <li
                      key={item}
                      className={`border px-3 py-1 font-display text-[15.5px] font-medium ${
                        i === 0
                          ? "border-traza bg-traza text-noche"
                          : "border-borde-2 text-[#c9d4e6]"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Revelar>
        ))}
      </dl>
    </Seccion>
  );
}
