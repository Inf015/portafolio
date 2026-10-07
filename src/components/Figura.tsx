import Image from "next/image";
import { imagenes, type ClaveImagen } from "@/data/comun";
import type { Contenido, Figura as DatosFigura } from "@/data/tipos";

type Props = {
  figura: DatosFigura;
  ui: Contenido["ui"];
  prioridad?: boolean;
  /** Las capturas de pantalla se muestran con fondo claro propio; las fotos, a sangre. */
  sizes?: string;
  className?: string;
};

/**
 * Las imágenes entran al documento como figuras numeradas con pie, igual que en un
 * informe técnico. Sin bordes redondeados ni sombras: son evidencia, no adorno.
 *
 * El archivo y sus dimensiones salen de `comun.ts` —son los mismos en los dos idiomas—
 * y el texto alternativo y el pie vienen del contenido, que sí se traduce.
 */
export function Figura({
  figura,
  ui,
  prioridad = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: Props) {
  const imagen = imagenes[figura.recurso as ClaveImagen];
  const credito = "credito" in imagen ? imagen.credito : undefined;

  return (
    <figure className={className}>
      <div className="border border-borde-2">
        <Image
          src={imagen.src}
          alt={figura.alt}
          width={imagen.ancho}
          height={imagen.alto}
          priority={prioridad}
          sizes={sizes}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 text-[13px] leading-relaxed text-tenue">
        <span className="font-display font-semibold text-traza">
          {ui.figura} {figura.numero}
        </span>
        <span className="flex-1">
          {figura.pie}
          {credito && (
            <span className="text-tenue/70">
              {" "}
              · {ui.foto}: {credito}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
