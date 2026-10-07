import { contenido, type Idioma } from "@/data/contenido";
import { Carriles } from "./Carriles";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

function Campo({
  etiqueta,
  children,
  className = "",
}: {
  etiqueta: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-1 font-display text-[13px] font-semibold text-traza">{etiqueta}</p>
      <div className="text-[15px] leading-[1.65] text-[#c3cee0]">{children}</div>
    </div>
  );
}

function ListaNumerada({ items }: { items: string[] }) {
  return (
    <ol className="space-y-1.5">
      {items.map((item, i) => (
        <li key={item.slice(0, 24)} className="flex gap-3">
          <span className="font-display text-[13px] font-semibold tabular-nums text-tenue">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function ComoTrabajo({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const { casoDePrueba, reporteDefecto, ui } = c;

  return (
    <Seccion id="como-trabajo" titulo={c.paralelo.titulo} descripcion={c.secciones.comoTrabajo.descripcion}>
      <Carriles idioma={idioma} />

      {/* Cifras */}
      <Revelar>
        <dl className="mt-14 grid grid-cols-2 gap-px border border-borde-2 bg-borde-2 lg:grid-cols-4">
          {c.metricas.map((m) => (
            <div key={m.etiqueta} className="bg-panel px-5 py-6">
              <dt className="font-display text-[clamp(2.2rem,4.4vw,3.2rem)] font-bold leading-none tracking-[-0.03em] tabular-nums text-texto">
                {m.valor}
              </dt>
              <dd className="mt-2.5">
                <span className="block font-display text-[15px] font-semibold text-texto">
                  {m.etiqueta}
                </span>
                <span className="mt-1 block text-[13.5px] leading-snug text-tenue">
                  {m.nota}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Revelar>

      {/* Flujo de trabajo */}
      <Revelar>
        <h3 className="mb-5 mt-14 font-display text-[1.35rem] font-bold tracking-[-0.01em] text-texto">
          {ui.elCicloPasoAPaso}
        </h3>
        <ol className="grid gap-px border border-borde-2 bg-borde-2 md:grid-cols-5">
          {c.flujoTrabajo.map((etapa, i) => (
            <li key={etapa.paso} className="bg-panel p-5">
              <span className="font-display text-[13px] font-semibold tabular-nums text-traza">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-1.5 font-display text-[18px] font-bold text-texto">
                {etapa.paso}
              </h4>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-tenue">{etapa.detalle}</p>
            </li>
          ))}
        </ol>
      </Revelar>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Caso de prueba */}
        <Revelar>
          <article className="h-full border border-borde-2 bg-panel">
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-borde-2 bg-panel-2 px-5 py-3 font-display text-[13px] font-semibold">
              <span className="text-texto">
                {ui.casoDePrueba} · {casoDePrueba.id}
              </span>
              <span className="text-tenue">{casoDePrueba.tipo}</span>
            </header>

            <div className="space-y-4 p-5">
              <h3 className="font-display text-[1.3rem] font-bold leading-snug tracking-[-0.01em] text-texto">
                {casoDePrueba.titulo}
              </h3>

              <div className="grid grid-cols-2 gap-4 border-y border-borde py-3">
                <Campo etiqueta={ui.modulo}>{casoDePrueba.modulo}</Campo>
                <Campo etiqueta={ui.prioridad}>{casoDePrueba.prioridad}</Campo>
              </div>

              <Campo etiqueta={ui.precondiciones}>
                <ListaNumerada items={casoDePrueba.precondiciones} />
              </Campo>
              <Campo etiqueta={ui.pasos}>
                <ListaNumerada items={casoDePrueba.pasos} />
              </Campo>

              <Campo etiqueta={ui.resultadoEsperado}>
                <p className="border-l-2 border-verde pl-3">{casoDePrueba.esperado}</p>
              </Campo>
              <Campo etiqueta={ui.resultadoObtenido}>
                <p className="border-l-2 border-rojo pl-3">{casoDePrueba.obtenido}</p>
              </Campo>

              <div className="flex flex-wrap items-center gap-3 border-t border-borde pt-3">
                <span className="border border-rojo px-2.5 py-0.5 font-display text-[13px] font-semibold text-rojo">
                  {casoDePrueba.estado}
                </span>
                <span className="text-[14px] text-tenue">
                  {ui.derivoEn} {casoDePrueba.defecto}
                </span>
              </div>
            </div>
          </article>
        </Revelar>

        {/* Reporte de defecto */}
        <Revelar retraso={100}>
          <article className="h-full border border-rojo/60 bg-panel">
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rojo/60 bg-rojo px-5 py-3 font-display text-[13px] font-semibold text-noche">
              <span>
                {ui.reporteDefecto} · {reporteDefecto.id}
              </span>
              <span>
                {ui.severidad} {reporteDefecto.severidad}
              </span>
            </header>

            <div className="space-y-4 p-5">
              <h3 className="font-display text-[1.3rem] font-bold leading-snug tracking-[-0.01em] text-texto">
                {reporteDefecto.titulo}
              </h3>

              <div className="grid grid-cols-2 gap-4 border-y border-borde py-3">
                <Campo etiqueta={ui.modulo}>{reporteDefecto.modulo}</Campo>
                <Campo etiqueta={ui.prioridad}>{reporteDefecto.prioridad}</Campo>
                <Campo etiqueta={ui.entorno} className="col-span-2">
                  <span className="font-display text-[14px]">{reporteDefecto.entorno}</span>
                </Campo>
              </div>

              <Campo etiqueta={ui.pasosParaReproducir}>
                <ListaNumerada items={reporteDefecto.pasos} />
              </Campo>
              <Campo etiqueta={ui.esperado}>
                <p className="border-l-2 border-verde pl-3">{reporteDefecto.esperado}</p>
              </Campo>
              <Campo etiqueta={ui.obtenido}>
                <p className="border-l-2 border-rojo pl-3">{reporteDefecto.obtenido}</p>
              </Campo>

              <div className="border-l-2 border-ambar bg-ambar/[0.07] py-2.5 pl-4 pr-3">
                <p className="mb-1 font-display text-[13px] font-semibold text-ambar">
                  {ui.impacto}
                </p>
                <p className="text-[15px] leading-[1.65] text-texto">{reporteDefecto.impacto}</p>
              </div>

              <Campo etiqueta={ui.evidenciaAdjunta}>{reporteDefecto.evidencia}</Campo>
            </div>
          </article>
        </Revelar>
      </div>
    </Seccion>
  );
}
