import { Revelar } from "./Revelar";

type Props = {
  id: string;
  /** Número de cláusula del documento: §1, §2, §3… */
  seccion: string;
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
};

export function Seccion({ id, seccion, titulo, descripcion, children }: Props) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 lg:px-10"
    >
      <Revelar>
        <div className="border-t border-tinta pt-4">
          <div className="grid gap-x-12 gap-y-4 md:grid-cols-[8rem_1fr]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sello">
              § {seccion}
            </span>
            <div>
              <h2 className="font-serif text-3xl font-semibold tracking-[-0.02em] text-tinta sm:text-[2.5rem]">
                {titulo}
              </h2>
              {descripcion && (
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-tinta-media">
                  {descripcion}
                </p>
              )}
            </div>
          </div>
        </div>
      </Revelar>

      <div className="mt-10 md:mt-12 md:pl-[calc(8rem+3rem)]">{children}</div>
    </section>
  );
}
