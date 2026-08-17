import Image from "next/image";
import { imagenes, type ClaveImagen } from "@/data/comun";
import type { Contenido, Figura as DatosFigura } from "@/data/tipos";

type Props = {
  figura: DatosFigura;
  ui: Contenido["ui"];
  /** Sobre el bloque de fondo oscuro, el marco y el pie invierten su color. */
  oscuro?: boolean;
  prioridad?: boolean;
  className?: string;
};

/**
 * Las imágenes entran al documento como figuras numeradas con pie, igual que en
 * un informe técnico. Sin bordes redondeados ni sombras: son evidencia, no adorno.
 *
 * El archivo y sus dimensiones salen de `comun.ts` —son los mismos en los dos idiomas—
 * y el texto alternativo y el pie vienen del contenido, que sí se traduce.
 */
export function Figura({
  figura,
  ui,
  oscuro = false,
  prioridad = false,
  className = "",
}: Props) {
  const imagen = imagenes[figura.recurso as ClaveImagen];
  const credito = "credito" in imagen ? imagen.credito : undefined;

  return (
    <figure className={className}>
      <div className={`border ${oscuro ? "border-papel/20" : "border-regla"}`}>
        <Image
          src={imagen.src}
          alt={figura.alt}
          width={imagen.ancho}
          height={imagen.alto}
          priority={prioridad}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="block h-auto w-full"
        />
      </div>
      <figcaption
        className={`mt-2 flex flex-wrap items-baseline gap-x-2 font-mono text-[10.5px] leading-relaxed ${
          oscuro ? "text-papel/45" : "text-tinta-clara"
        }`}
      >
        <span className={oscuro ? "text-sello-claro" : "text-sello"}>
          {ui.figura} {figura.numero}
        </span>
        <span className="flex-1">
          {figura.pie}
          {credito && (
            <span className={oscuro ? "text-papel/30" : "text-regla"}>
              {" "}
              · {ui.foto}: {credito}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
