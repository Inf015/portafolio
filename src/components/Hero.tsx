import Image from "next/image";
import Link from "next/link";
import { imagenes, perfil } from "@/data/comun";
import { contenido, rutas, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

/** Árbol de luces de salida: tres ámbar que se apagan y una verde que se queda. */
function Arbol() {
  const base = "block h-4 w-4 rounded-full border border-[#313f55] bg-[#1d2635]";
  return (
    <span
      aria-hidden="true"
      className="inline-flex gap-2.5 rounded-full border border-borde-2 bg-[#05080d] px-3.5 py-2.5"
    >
      <i className={`${base} luz-ambar-1`} />
      <i className={`${base} luz-ambar-2`} />
      <i className={`${base} luz-ambar-3`} />
      <i className={`${base} luz-verde`} />
    </span>
  );
}

export function Hero({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const foto = imagenes.piloto;

  const ficha = [
    { campo: c.ui.fichaRol, valor: c.titulo },
    { campo: c.ui.fichaUbicacion, valor: c.ubicacion },
    { campo: c.ui.fichaCertificacion, valor: c.ui.fichaCertificacionValor },
    { campo: c.ui.fichaFormacion, valor: c.ui.fichaFormacionValor },
  ];

  return (
    <section
      id="inicio"
      className="relative bg-[radial-gradient(900px_420px_at_80%_-10%,#10213f_0%,transparent_70%)]"
    >
      <div className="mx-auto grid w-full max-w-6xl items-end gap-x-14 gap-y-10 px-6 pb-12 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:px-10">
        <div>
          <Revelar>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <Arbol />
              {perfil.disponible && (
                <span className="inline-flex items-center gap-2 font-display text-[13px] font-medium text-verde">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-verde" />
                  {c.ui.disponible}
                </span>
              )}
            </div>
          </Revelar>

          <Revelar retraso={80}>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.9rem,7.6vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-texto">
              {perfil.nombre}
              <span className="block text-traza">{c.ui.heroLinea}</span>
            </h1>
          </Revelar>

          <Revelar retraso={160}>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg leading-relaxed text-tenue sm:text-xl">
              {c.pitch}
            </p>
          </Revelar>

          <Revelar retraso={230}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contacto"
                className="border border-texto bg-texto px-5 py-3 font-display text-[15px] font-semibold text-noche transition-colors hover:border-verde hover:bg-verde"
              >
                {c.ui.contactar}
              </a>
              <a
                href="#proyectos"
                className="border border-texto px-5 py-3 font-display text-[15px] font-semibold text-texto transition-colors hover:bg-texto hover:text-noche"
              >
                {c.ui.verCasos}
              </a>
              <Link
                href={rutas.cv(idioma)}
                className="border border-texto px-5 py-3 font-display text-[15px] font-semibold text-texto transition-colors hover:bg-texto hover:text-noche"
              >
                {c.ui.verCV}
              </Link>
            </div>
          </Revelar>
        </div>

        <Revelar retraso={200}>
          <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 right-0 z-10 flex h-1.5"
            >
              <span className="w-1/3 bg-rojo" />
              <span className="w-1/3 bg-texto" />
              <span className="w-1/3 bg-carril" />
            </span>
            <Image
              src={foto.src}
              alt={c.figuras.piloto.alt}
              width={foto.ancho}
              height={foto.alto}
              priority
              sizes="(max-width: 1024px) 90vw, 440px"
              className="block h-auto max-h-[600px] w-full border border-borde-2 object-cover object-[50%_14%]"
            />
            <figcaption className="mt-3 text-[13px] text-tenue">{c.ubicacion}</figcaption>
          </figure>
        </Revelar>
      </div>

      <Revelar retraso={300}>
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
          <dl className="grid grid-cols-2 border-t border-borde lg:grid-cols-4">
            {ficha.map((item) => (
              <div
                key={item.campo}
                className="border-b border-borde py-4 pr-4 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-borde lg:[&:not(:first-child)]:pl-6"
              >
                <dt className="text-[13px] text-tenue">{item.campo}</dt>
                <dd className="mt-0.5 font-display text-[15px] font-medium leading-snug text-texto">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Revelar>
    </section>
  );
}
