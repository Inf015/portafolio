import { contenido, type Idioma } from "@/data/contenido";
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
      <p className="etiqueta-campo mb-1">{etiqueta}</p>
      <div className="text-[13.5px] leading-[1.65] text-tinta-media">
        {children}
      </div>
    </div>
  );
}

function ListaNumerada({ items }: { items: string[] }) {
  return (
    <ol className="space-y-1">
      {items.map((item, i) => (
        <li key={item.slice(0, 24)} className="flex gap-2.5">
          <span className="font-mono text-[11px] nums-tabulares text-tinta-clara">
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
    <Seccion id="como-trabajo" seccion="3" {...c.secciones.comoTrabajo}>
      {/* Cifras */}
      <Revelar>
        <dl className="mb-14 grid grid-cols-2 gap-px border border-regla bg-regla lg:grid-cols-4">
          {c.metricas.map((m) => (
            <div key={m.etiqueta} className="bg-papel-alto px-5 py-6">
              <dt className="font-serif text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-tinta nums-tabulares">
                {m.valor}
              </dt>
              <dd className="mt-2">
                <span className="block text-[13px] font-medium text-tinta">
                  {m.etiqueta}
                </span>
                <span className="mt-1 block font-mono text-[11px] leading-snug text-tinta-clara">
                  {m.nota}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Revelar>

      {/* Flujo de trabajo */}
      <Revelar>
        <h3 className="etiqueta-campo mb-5">{ui.elCicloPasoAPaso}</h3>
        <ol className="mb-14 grid gap-px border border-regla bg-regla md:grid-cols-5">
          {c.flujoTrabajo.map((etapa, i) => (
            <li key={etapa.paso} className="relative bg-papel-alto p-5">
              <span className="font-mono text-[11px] nums-tabulares text-sello">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-1.5 font-serif text-[17px] font-semibold text-tinta">
                {etapa.paso}
              </h4>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-tinta-media">
                {etapa.detalle}
              </p>
            </li>
          ))}
        </ol>
      </Revelar>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Caso de prueba */}
        <Revelar>
          <article className="h-full border border-regla bg-papel-alto">
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-regla bg-tinta px-5 py-2.5 text-papel-alto">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                {ui.casoDePrueba} · {casoDePrueba.id}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-papel/50">
                {casoDePrueba.tipo}
              </span>
            </header>

            <div className="space-y-4 p-5">
              <h3 className="font-serif text-[19px] font-semibold leading-snug text-tinta">
                {casoDePrueba.titulo}
              </h3>

              <div className="grid grid-cols-2 gap-4 border-y border-regla-fina py-3">
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
                {casoDePrueba.esperado}
              </Campo>

              <Campo etiqueta={ui.resultadoObtenido}>
                {casoDePrueba.obtenido}
              </Campo>

              <div className="flex flex-wrap items-center gap-3 border-t border-regla-fina pt-3">
                <span className="border border-sello px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sello">
                  {casoDePrueba.estado}
                </span>
                <span className="font-mono text-[11px] text-tinta-clara">
                  {ui.derivoEn} {casoDePrueba.defecto} →
                </span>
              </div>
            </div>
          </article>
        </Revelar>

        {/* Reporte de defecto */}
        <Revelar retraso={100}>
          <article className="h-full border border-tinta bg-papel-alto">
            <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-tinta bg-sello px-5 py-2.5 text-papel-alto">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                {ui.reporteDefecto} · {reporteDefecto.id}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                {ui.severidad} {reporteDefecto.severidad}
              </span>
            </header>

            <div className="space-y-4 p-5">
              <h3 className="font-serif text-[19px] font-semibold leading-snug text-tinta">
                {reporteDefecto.titulo}
              </h3>

              <div className="grid grid-cols-2 gap-4 border-y border-regla-fina py-3">
                <Campo etiqueta={ui.modulo}>{reporteDefecto.modulo}</Campo>
                <Campo etiqueta={ui.prioridad}>{reporteDefecto.prioridad}</Campo>
                <Campo etiqueta={ui.entorno} className="col-span-2">
                  <span className="font-mono text-[12px]">
                    {reporteDefecto.entorno}
                  </span>
                </Campo>
              </div>

              <Campo etiqueta={ui.pasosParaReproducir}>
                <ListaNumerada items={reporteDefecto.pasos} />
              </Campo>

              <Campo etiqueta={ui.esperado}>{reporteDefecto.esperado}</Campo>
              <Campo etiqueta={ui.obtenido}>{reporteDefecto.obtenido}</Campo>

              <div className="border-l-2 border-sello bg-sello/[0.04] py-2 pl-4">
                <p className="etiqueta-campo mb-1 text-sello">{ui.impacto}</p>
                <p className="text-[13.5px] leading-[1.65] text-tinta">
                  {reporteDefecto.impacto}
                </p>
              </div>

              <Campo etiqueta={ui.evidenciaAdjunta}>
                {reporteDefecto.evidencia}
              </Campo>
            </div>
          </article>
        </Revelar>
      </div>
    </Seccion>
  );
}
