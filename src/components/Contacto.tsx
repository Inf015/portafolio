import { perfil, revision } from "@/data/comun";
import { contenido, conValores, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

type Enlace = {
  etiqueta: string;
  valor: string;
  href: string;
  externo?: boolean;
};

/**
 * El cierre en azul de carril: es lo único claro de la página, así que el contacto es lo
 * último que se ve y lo que más contrasta. El texto va en el azul-noche del fondo, no en
 * negro, para que siga siendo de la familia.
 */
export function Contacto({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  const enlaces: Enlace[] = [
    { etiqueta: c.ui.email, valor: perfil.email, href: `mailto:${perfil.email}` },
    {
      etiqueta: "LinkedIn",
      valor: perfil.linkedin.replace("https://linkedin.com/in/", ""),
      href: perfil.linkedin,
      externo: true,
    },
    {
      etiqueta: "GitHub",
      valor: perfil.github.replace("https://github.com/", "@"),
      href: perfil.github,
      externo: true,
    },
  ];

  // El número llega por variable de entorno, así que puede no estar definido.
  if (perfil.mostrarTelefono && perfil.telefono) {
    enlaces.push({
      etiqueta: c.ui.telefono,
      valor: perfil.telefono,
      href: `tel:${perfil.telefono.replace(/[^\d+]/g, "")}`,
    });
  }

  return (
    <section id="contacto" className="bg-carril-claro text-noche">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 lg:px-10">
        <Revelar>
          <h2 className="max-w-[10ch] text-balance font-display text-[clamp(3rem,9vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            {c.secciones.contacto.titulo}
          </h2>
          <p className="mt-6 max-w-[48ch] text-pretty text-lg leading-relaxed sm:text-xl">
            {perfil.disponible ? c.ui.contactoDisponible : c.ui.contactoNoDisponible}
          </p>

          <a
            href={`mailto:${perfil.email}`}
            className="mt-8 inline-block bg-noche px-7 py-3.5 font-display text-[16px] font-semibold text-texto transition-colors hover:bg-verde hover:text-noche"
          >
            {c.ui.escribirme}
          </a>

          <dl className="mt-12 grid border-t border-noche/30 sm:grid-cols-2">
            {enlaces.map((enlace) => (
              <div
                key={enlace.etiqueta}
                className="border-b border-noche/30 py-4 sm:odd:pr-6 sm:even:border-l sm:even:border-noche/30 sm:even:pl-6"
              >
                <dt className="font-display text-[13.5px] font-semibold text-noche/75">
                  {enlace.etiqueta}
                </dt>
                <dd className="mt-1">
                  <a
                    href={enlace.href}
                    {...(enlace.externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-[17px] font-medium underline decoration-noche/40 underline-offset-4 transition-colors hover:decoration-noche"
                  >
                    {enlace.valor}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Revelar>
      </div>
    </section>
  );
}

export function Footer({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <footer className="border-t border-borde bg-noche">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 font-display text-[13px] text-tenue sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>
          © {new Date().getFullYear()} {perfil.nombre}
        </p>
        <p className="tabular-nums">
          {conValores(c.ui.finDelDocumento, { rev: revision })}
        </p>
      </div>
    </footer>
  );
}
