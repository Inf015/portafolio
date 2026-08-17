import Link from "next/link";
import { perfil, revision } from "@/data/comun";
import { contenido, conValores, rutas, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

export function Hero({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  const ficha = [
    { campo: c.ui.fichaRol, valor: c.titulo },
    { campo: c.ui.fichaUbicacion, valor: c.ubicacion },
    { campo: c.ui.fichaCertificacion, valor: c.ui.fichaCertificacionValor },
    { campo: c.ui.fichaFormacion, valor: c.ui.fichaFormacionValor },
  ];

  return (
    <section
      id="inicio"
      className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16 sm:pt-36 lg:px-10"
    >
      {/* Encabezado de documento */}
      <Revelar>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-tinta pb-3">
          <span className="etiqueta-campo">{c.ui.encabezadoDocumento}</span>
          <span className="etiqueta-campo nums-tabulares">
            {conValores(c.ui.revision, { rev: revision })}
          </span>
        </div>
      </Revelar>

      <div className="grid gap-x-12 gap-y-10 pt-10 lg:grid-cols-[1fr_auto] lg:pt-14">
        <div>
          <Revelar>
            <h1 className="font-serif text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-tinta">
              {perfil.nombre.split(" ")[0]}
              <br />
              {perfil.nombre.split(" ").slice(1).join(" ")}
            </h1>
          </Revelar>

          <Revelar retraso={90}>
            <p className="mt-6 max-w-xl font-serif text-xl leading-[1.5] text-tinta-media sm:text-[1.4rem]">
              {c.titulo} — {c.subtitulo}.
            </p>
          </Revelar>

          <Revelar retraso={160}>
            <p className="mt-8 max-w-lg text-pretty text-[15px] leading-[1.75] text-tinta-media">
              {c.pitch}
            </p>
          </Revelar>

          <Revelar retraso={230}>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
              <a
                href="#contacto"
                className="bg-tinta px-6 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-papel-alto transition-colors hover:bg-sello"
              >
                {c.ui.contactar}
              </a>
              <a
                href="#proyectos"
                className="border border-tinta px-6 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-tinta transition-colors hover:bg-tinta hover:text-papel-alto"
              >
                {c.ui.verCasos}
              </a>
              <Link
                href={rutas.cv(idioma)}
                className="px-2 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-clara underline decoration-regla underline-offset-[5px] transition-colors hover:text-sello hover:decoration-sello"
              >
                {c.ui.verCV}
              </Link>
            </div>
          </Revelar>
        </div>

        {/* Ficha técnica lateral */}
        <Revelar retraso={300} className="lg:w-[19rem]">
          <div className="relative border-t border-tinta pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-1">
            {perfil.disponible && (
              <div className="mb-7 inline-flex -rotate-2 items-center gap-2 border-2 border-sello px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-sello" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-sello">
                  {c.ui.disponible}
                </span>
              </div>
            )}

            <dl className="divide-y divide-regla-fina border-y border-regla-fina">
              {ficha.map((item) => (
                <div key={item.campo} className="py-3.5">
                  <dt className="etiqueta-campo">{item.campo}</dt>
                  <dd className="mt-1 text-[13px] leading-snug text-tinta">
                    {item.valor}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 font-mono text-[11px] leading-relaxed text-tinta-clara">
              {c.ui.documentoVerificado}
            </p>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
