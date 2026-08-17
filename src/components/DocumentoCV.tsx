import Link from "next/link";
import { perfil } from "@/data/comun";
import { contenido, rutas, type Idioma } from "@/data/contenido";

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 border-b border-tinta pb-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-tinta">
      {children}
    </h2>
  );
}

/**
 * Sección con entradas repetidas (experiencia, proyectos).
 *
 * El título y la **primera** entrada se emiten dentro de una misma caja
 * `break-inside-avoid`, así que al imprimir el encabezado nunca puede quedar solo al
 * pie de una hoja. Poner `break-after: avoid` en el <h2> no bastaba: Chrome lo ignora
 * cuando el hermano siguiente es un contenedor con varios hijos, y «Proyectos» quedaba
 * huérfano al final de la página 1 con todo el bloque saltando a la 2.
 *
 * Como la primera entrada deja de compartir padre con el resto, la separación la aplica
 * cada entrada (`separacion`) en lugar de un `space-y-*` del contenedor.
 */
function SeccionRepetida<T>({
  titulo,
  datos,
  clave,
  separacion,
  fila,
  className = "mb-6",
}: {
  titulo: string;
  datos: T[];
  clave: (dato: T) => string;
  /** Margen que separa una entrada de la anterior; la primera no lo lleva. */
  separacion: string;
  fila: (dato: T) => React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      {datos.map((dato, i) => {
        const entrada = (
          <article
            key={clave(dato)}
            className={`break-inside-avoid ${i > 0 ? separacion : ""}`}
          >
            {fila(dato)}
          </article>
        );

        return i === 0 ? (
          <div key="apertura" className="break-inside-avoid">
            <Titulo>{titulo}</Titulo>
            {entrada}
          </div>
        ) : (
          entrada
        );
      })}
    </section>
  );
}

export function DocumentoCV({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const t = c.cv;

  /*
   * Contacto en dos renglones deliberados en vez de uno que se desborda.
   * En una sola línea no cabe, y al cortarse dejaba el separador «·» colgando en el
   * borde derecho. Partirlo por significado (quién soy / dónde encontrarme) hace que el
   * corte se lea como decisión y no como accidente.
   *
   * En el PDF estos datos sí se pueden pulsar, así que van como enlaces reales.
   */
  const renglonesContacto: { texto: string; href?: string }[][] = [
    [
      { texto: perfil.email, href: `mailto:${perfil.email}` },
      // También exige que haya número: sin la variable de entorno definida, activar
      // `mostrarTelefono` dejaría un separador suelto en la línea de contacto.
      ...(perfil.mostrarTelefono && perfil.telefono
        ? [
            {
              texto: perfil.telefono,
              href: `tel:${perfil.telefono.replace(/[^+\d]/g, "")}`,
            },
          ]
        : []),
      { texto: c.ubicacion },
    ],
    [
      { texto: perfil.linkedin.replace("https://", ""), href: perfil.linkedin },
      { texto: perfil.github.replace("https://", ""), href: perfil.github },
    ],
  ];

  return (
    <main className="mx-auto max-w-[820px] bg-papel-alto px-10 py-12 text-tinta print:max-w-none print:bg-transparent print:px-0 print:py-0">
      {/* Barra de utilidades. No se imprime: en papel ya no sirve de nada. */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border border-regla bg-papel px-4 py-3 text-[13px] print:hidden">
        {/*
         * Enlace normal, no `download`: la ruta ya manda el Content-Disposition con el
         * nombre del archivo, y así el navegador puede previsualizarlo antes de guardar.
         */}
        <a
          href={rutas.pdf(idioma)}
          className="border border-sello bg-sello px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-papel-alto transition-colors hover:bg-sello-claro"
        >
          ↓ {t.descargarPdf}
        </a>
        <Link
          href={rutas.inicio(idioma)}
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-tinta-clara underline decoration-regla underline-offset-4 transition-colors hover:text-sello"
        >
          {t.volver}
        </Link>
      </div>

      <header className="mb-7">
        <h1 className="font-serif text-[2.6rem] font-semibold leading-none tracking-[-0.025em]">
          {perfil.nombre}
        </h1>
        <p className="mt-2 font-serif text-[1.05rem] text-tinta-media">
          {c.titulo} — {c.subtitulo}
        </p>
        <div className="mt-3 space-y-0.5 font-mono text-[11px] text-tinta-media">
          {renglonesContacto.map((renglon) => (
            <p key={renglon[0].texto} className="flex flex-wrap gap-x-3">
              {renglon.map((dato, i) => (
                <span key={dato.texto}>
                  {dato.href ? (
                    <a
                      href={dato.href}
                      className="transition-colors hover:text-sello"
                    >
                      {dato.texto}
                    </a>
                  ) : (
                    dato.texto
                  )}
                  {i < renglon.length - 1 && (
                    <span className="ml-3 text-regla" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
      </header>

      <section className="mb-6 break-inside-avoid">
        <Titulo>{t.perfil}</Titulo>
        <p className="text-[13.5px] leading-[1.6] text-tinta-media">
          {c.pitch}
        </p>
      </section>

      <section className="mb-6 break-inside-avoid">
        <Titulo>{t.competencias}</Titulo>
        <dl className="space-y-1.5">
          {c.habilidades.map((grupo) => (
            <div
              key={grupo.categoria}
              /* La columna de rótulos se dimensiona por el más largo en inglés
                 ("Infrastructure and Systems"): con menos, tres de seis partían en dos
                 líneas y la lista quedaba desalineada. */
              className="grid grid-cols-[12rem_1fr] gap-x-4 text-[12.5px]"
            >
              <dt className="font-medium text-tinta">{grupo.categoria}</dt>
              <dd className="text-tinta-media">{grupo.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SeccionRepetida
        titulo={t.experiencia}
        datos={c.experiencia}
        clave={(puesto) => `${puesto.empresa}-${puesto.puesto}`}
        separacion="mt-4"
        fila={(puesto) => (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[14px] font-semibold text-tinta">
                {puesto.puesto}{" "}
                <span className="font-normal text-tinta-media">
                  — {puesto.empresa}
                </span>
              </h3>
              <span className="font-mono text-[11px] nums-tabulares text-tinta-clara">
                {puesto.periodo}
              </span>
            </div>
            <ul className="mt-1.5 space-y-1">
              {puesto.logros.map((logro) => (
                <li
                  key={logro.slice(0, 24)}
                  className="flex gap-2.5 text-[12.5px] leading-[1.55] text-tinta-media"
                >
                  <span aria-hidden="true" className="text-tinta-clara">
                    —
                  </span>
                  <span>{logro}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      />

      <SeccionRepetida
        titulo={t.proyectos}
        datos={c.proyectos}
        clave={(proyecto) => proyecto.nombre}
        separacion="mt-3.5"
        fila={(proyecto) => (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="text-[14px] font-semibold text-tinta">
                {proyecto.nombre}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-tinta-clara">
                {proyecto.estado ?? proyecto.rol}
              </span>
              {proyecto.enlace && (
                <a
                  href={proyecto.enlace}
                  className="font-mono text-[10px] text-tinta-clara transition-colors hover:text-sello"
                >
                  {proyecto.enlace.replace("https://", "")}
                </a>
              )}
            </div>
            <p className="mt-1 text-[12.5px] leading-[1.55] text-tinta-media">
              {proyecto.resumen}
            </p>
            <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-tinta-clara">
              {proyecto.tags.join(" · ")}
            </p>
          </>
        )}
      />

      <section className="grid grid-cols-2 gap-x-10 gap-y-5 break-inside-avoid">
        <div>
          <Titulo>{t.educacion}</Titulo>
          <p className="text-[13px] font-semibold text-tinta">
            {c.educacion.titulo}
            {c.educacion.distincion && (
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-sello">
                {c.educacion.distincion}
              </span>
            )}
          </p>
          <p className="text-[12.5px] text-tinta-media">
            {c.educacion.institucion}
          </p>
          <p className="font-mono text-[11px] nums-tabulares text-tinta-clara">
            {c.educacion.periodo}
          </p>
        </div>

        <div>
          <Titulo>{t.certificaciones}</Titulo>
          <ul className="space-y-1 text-[12.5px]">
            {c.certificaciones.map((cert) => (
              <li key={cert.nombre} className="text-tinta-media">
                <span className="font-semibold text-tinta">{cert.nombre}</span>{" "}
                — {cert.estado} ({cert.anio})
              </li>
            ))}
            {c.idiomas.map((item) => (
              <li key={item.idioma} className="text-tinta-media">
                <span className="font-semibold text-tinta">{item.idioma}</span> —{" "}
                {item.nivel}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
