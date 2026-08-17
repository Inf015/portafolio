import { proyectos } from "@/data/perfil";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Proyectos() {
  return (
    <Seccion
      id="proyectos"
      seccion="5"
      titulo="Casos"
      descripcion="Trabajo donde apliqué QA y desarrollo de punta a punta."
    >
      <div className="space-y-6">
        {proyectos.map((proyecto, i) => (
          <Revelar key={proyecto.nombre} retraso={i * 70}>
            <article
              className={`border bg-papel-alto ${
                proyecto.destacado ? "border-tinta" : "border-regla"
              }`}
            >
              {/* Cabecera del expediente */}
              <header
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b px-6 py-3 ${
                  proyecto.destacado
                    ? "border-tinta bg-tinta text-papel-alto"
                    : "border-regla text-tinta-clara"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] nums-tabulares">
                  Caso {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  {proyecto.estado ??
                    (proyecto.destacado ? "Destacado" : "Personal")}
                </span>
              </header>

              <div className="px-6 py-7">
                <div className="grid gap-x-10 gap-y-5 md:grid-cols-[1fr_13rem]">
                  <div>
                    <h3 className="font-serif text-[26px] font-semibold leading-tight tracking-[-0.015em] text-tinta">
                      {proyecto.nombre}
                    </h3>
                    <p className="mt-3 max-w-xl text-pretty text-[15px] leading-[1.7] text-tinta-media">
                      {proyecto.resumen}
                    </p>
                  </div>

                  <dl className="self-start border-t border-regla-fina pt-3">
                    <dt className="etiqueta-campo">Rol</dt>
                    <dd className="mt-1 text-[13px] leading-snug text-tinta">
                      {proyecto.rol}
                    </dd>
                  </dl>
                </div>

                <div className="mt-7 border-t border-regla-fina pt-5">
                  <p className="etiqueta-campo mb-3">Detalle</p>
                  <ul className="space-y-2.5">
                    {proyecto.detalles.map((detalle, j) => (
                      <li
                        key={detalle.slice(0, 32)}
                        className="flex gap-4 text-[14px] leading-[1.7] text-tinta-media"
                      >
                        <span className="font-mono text-[11px] nums-tabulares text-tinta-clara">
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span className="text-pretty">{detalle}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {proyecto.figuras && (
                  <div className="mt-7 grid gap-5 border-t border-regla-fina pt-6 lg:grid-cols-2">
                    {proyecto.figuras.map((figura) => (
                      <Figura
                        key={figura.src}
                        src={figura.src}
                        alt={figura.alt}
                        numero={figura.numero}
                        pie={figura.pie}
                        ancho={figura.ancho}
                        alto={figura.alto}
                      />
                    ))}
                  </div>
                )}

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-regla-fina pt-4">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {proyecto.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[11px] uppercase tracking-[0.08em] text-tinta-clara"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  {proyecto.enlace && (
                    <a
                      href={proyecto.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-sello underline decoration-sello/40 underline-offset-4 transition-colors hover:decoration-sello"
                    >
                      Ver proyecto ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Revelar>
        ))}
      </div>
    </Seccion>
  );
}
