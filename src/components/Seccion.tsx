import { Revelar } from "./Revelar";

type Props = {
  id: string;
  titulo: string;
  descripcion?: string;
  /** Algunas secciones llevan un fondo distinto para marcar el ritmo de la página. */
  fondo?: "noche" | "panel";
  children: React.ReactNode;
};

/**
 * Marco común de las secciones del sitio. El titular va en el tipo de datos del sitio
 * (Chakra Petch) y sin numeración: las secciones no son una secuencia, así que contarlas
 * sería decorar.
 */
export function Seccion({ id, titulo, descripcion, fondo = "noche", children }: Props) {
  return (
    <section
      id={id}
      className={`border-t border-borde ${fondo === "panel" ? "bg-panel" : ""}`}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24 lg:px-10">
        <Revelar>
          <h2 className="max-w-[20ch] text-balance font-display text-[clamp(2rem,5.2vw,3.9rem)] font-bold leading-[1] tracking-[-0.03em] text-texto">
            {titulo}
          </h2>
          {descripcion && (
            <p className="mt-4 max-w-[56ch] text-pretty text-[17px] leading-relaxed text-tenue sm:text-lg">
              {descripcion}
            </p>
          )}
        </Revelar>

        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
