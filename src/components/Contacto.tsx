import { perfil, revision } from "@/data/comun";
import { contenido, conValores, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

type Enlace = {
  etiqueta: string;
  valor: string;
  href: string;
  externo?: boolean;
};

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
    <section
      id="contacto"
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 lg:px-10"
    >
      <Revelar>
        <div className="border-t border-tinta pt-4">
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-[8rem_1fr]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sello">
              § 8
            </span>

            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-tinta sm:text-[2.5rem]">
                {c.secciones.contacto.titulo}
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-tinta-media">
                {perfil.disponible
                  ? c.ui.contactoDisponible
                  : c.ui.contactoNoDisponible}
              </p>

              <a
                href={`mailto:${perfil.email}`}
                className="mt-8 inline-block bg-tinta px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-papel-alto transition-colors hover:bg-sello"
              >
                {c.ui.escribirme} →
              </a>

              <dl className="mt-12 grid border-t border-regla sm:grid-cols-2">
                {enlaces.map((enlace) => (
                  <div
                    key={enlace.etiqueta}
                    className="border-b border-regla-fina py-4 sm:odd:pr-6 sm:even:pl-6 sm:even:border-l"
                  >
                    <dt className="etiqueta-campo">{enlace.etiqueta}</dt>
                    <dd className="mt-1">
                      <a
                        href={enlace.href}
                        {...(enlace.externo
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[15px] text-tinta underline decoration-regla underline-offset-4 transition-colors hover:text-sello hover:decoration-sello"
                      >
                        {enlace.valor}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Revelar>
    </section>
  );
}

export function Footer({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <footer className="border-t border-tinta">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.1em] text-tinta-clara sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>
          © {new Date().getFullYear()} {perfil.nombre}
        </p>
        <p className="nums-tabulares">
          {conValores(c.ui.finDelDocumento, { rev: revision })}
        </p>
      </div>
    </footer>
  );
}
