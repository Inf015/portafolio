import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Número de figura, como en un informe técnico: Fig. 1, Fig. 2… */
  numero: number;
  pie: string;
  credito?: string;
  ancho: number;
  alto: number;
  /** Sobre el bloque de fondo oscuro, el marco y el pie invierten su color. */
  oscuro?: boolean;
  prioridad?: boolean;
  className?: string;
};

/**
 * Las imágenes entran al documento como figuras numeradas con pie, igual que en
 * un informe técnico. Sin bordes redondeados ni sombras: son evidencia, no adorno.
 */
export function Figura({
  src,
  alt,
  numero,
  pie,
  credito,
  ancho,
  alto,
  oscuro = false,
  prioridad = false,
  className = "",
}: Props) {
  return (
    <figure className={className}>
      <div className={`border ${oscuro ? "border-papel/20" : "border-regla"}`}>
        <Image
          src={src}
          alt={alt}
          width={ancho}
          height={alto}
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
          Fig. {numero}
        </span>
        <span className="flex-1">
          {pie}
          {credito && (
            <span className={oscuro ? "text-papel/30" : "text-regla"}>
              {" "}
              · Foto: {credito}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
