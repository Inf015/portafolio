import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

/**
 * Dos carriles, cuatro puntos de control: el mismo ciclo (medir, diagnosticar, ajustar,
 * repetir) corrido en el código y en la pista. Es el argumento del sitio dicho como
 * estructura: las dos filas avanzan juntas.
 *
 * En pantallas pequeñas cada carril se apila y cada celda lleva su punto de control como
 * rótulo (`data-p`), porque sin la fila de cabecera no se sabría a qué paso pertenece.
 */
export function Carriles({ idioma }: { idioma: Idioma }) {
  const { paralelo } = contenido[idioma];

  const carriles = [
    {
      clave: "software",
      nombre: paralelo.columnaSoftware,
      punto: "bg-traza",
      celdas: paralelo.ciclo.map((e) => ({
        paso: e.paso,
        titulo: e.software,
        detalle: e.softwareDetalle,
      })),
    },
    {
      clave: "pista",
      nombre: paralelo.columnaPista,
      punto: "bg-rojo",
      celdas: paralelo.ciclo.map((e) => ({
        paso: e.paso,
        titulo: e.pista,
        detalle: e.pistaDetalle,
      })),
    },
  ];

  return (
    <Revelar>
      <p className="max-w-[62ch] text-pretty text-[17px] leading-[1.75] text-tenue">
        {paralelo.texto}
      </p>

      <div className="mt-9 lg:border lg:border-borde-2 lg:bg-panel">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[8.5rem_repeat(4,1fr)] border-b border-borde-2 bg-panel-2 lg:grid"
        >
          <span />
          {paralelo.ciclo.map((e) => (
            <span
              key={e.paso}
              className="border-l border-borde px-4 py-3 font-display text-[14px] font-semibold text-texto"
            >
              {e.paso}
            </span>
          ))}
        </div>

        {carriles.map((carril, i) => (
          <div
            key={carril.clave}
            className={`mb-4 border border-borde-2 bg-panel lg:mb-0 lg:grid lg:grid-cols-[8.5rem_repeat(4,1fr)] lg:border-0 ${
              i > 0 ? "lg:border-t-[3px] lg:border-dashed lg:border-t-texto/20" : ""
            }`}
          >
            <p className="flex items-center gap-2.5 border-b border-borde px-4 py-3.5 font-display text-[18px] font-bold text-texto lg:items-start lg:border-b-0 lg:py-5">
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-full lg:mt-2 ${carril.punto}`}
              />
              {carril.nombre}
            </p>

            {carril.celdas.map((celda) => (
              <div
                key={celda.paso}
                data-p={celda.paso}
                className="border-b border-borde px-4 py-3.5 text-[15px] leading-[1.5] text-[#c3cee0] before:mb-0.5 before:block before:font-display before:text-[12.5px] before:font-semibold before:text-traza before:content-[attr(data-p)] last:border-b-0 lg:border-b-0 lg:border-l lg:py-5 lg:before:hidden"
              >
                <b className="block font-display text-[15.5px] font-semibold text-texto">
                  {celda.titulo}
                </b>
                {celda.detalle}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Revelar>
  );
}
