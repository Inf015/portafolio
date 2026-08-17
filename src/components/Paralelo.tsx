import { contenido, type Idioma } from "@/data/contenido";
import { Figura } from "./Figura";
import { Revelar } from "./Revelar";

/**
 * El ciclo es idéntico en ambos mundos; solo cambia el vocabulario.
 * Esa simetría es el argumento del sitio, así que se muestra literalmente en paralelo.
 */
export function Paralelo({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const { paralelo } = c;

  return (
    <section className="bg-tinta text-papel">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28 lg:px-10">
        <Revelar>
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-[8rem_1fr]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sello-claro">
              {paralelo.etiqueta}
            </span>
            <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="max-w-2xl">
                <h2 className="text-balance font-serif text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-papel-alto sm:text-[2.6rem]">
                  {paralelo.titulo}
                </h2>
                <p className="mt-6 text-pretty text-[15px] leading-[1.8] text-papel/70">
                  {paralelo.texto}
                </p>
              </div>

              <Figura
                figura={c.figuras.telemetria}
                ui={c.ui}
                oscuro
                className="self-start"
              />
            </div>
          </div>
        </Revelar>

        <div className="mt-14 md:pl-[calc(8rem+3rem)]">
          {/* Encabezado de las dos columnas */}
          <Revelar>
            <div className="grid grid-cols-2 gap-x-6 border-b border-papel/25 pb-2.5 sm:grid-cols-[8.5rem_1fr_1fr] sm:gap-x-8">
              <span className="hidden sm:block" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-sello-claro">
                {paralelo.columnaPista}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-papel/45">
                {paralelo.columnaSoftware}
              </span>
            </div>
          </Revelar>

          <ol>
            {paralelo.ciclo.map((fila, i) => (
              <Revelar key={fila.paso} retraso={i * 70}>
                <li className="grid grid-cols-2 items-baseline gap-x-6 gap-y-2 border-b border-papel/12 py-5 sm:grid-cols-[8.5rem_1fr_1fr] sm:gap-x-8 sm:gap-y-0">
                  <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.1em] nums-tabulares text-papel/40 sm:col-span-1">
                    {String(i + 1).padStart(2, "0")} · {fila.paso}
                  </span>
                  <span className="text-[14px] leading-snug text-papel-alto sm:text-[15px]">
                    {fila.pista}
                  </span>
                  <span className="text-[14px] leading-snug text-papel/65 sm:text-[15px]">
                    {fila.software}
                  </span>
                </li>
              </Revelar>
            ))}
          </ol>

          <Revelar retraso={300}>
            <p className="mt-10 font-serif text-2xl italic leading-snug text-papel-alto sm:text-[1.75rem]">
              «{c.lema}»
            </p>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
