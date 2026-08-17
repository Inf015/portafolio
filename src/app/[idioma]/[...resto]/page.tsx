import { notFound } from "next/navigation";

/*
 * Captura cualquier ruta bajo un idioma que no exista y la manda al `not-found` de este
 * segmento. Sin esto, una URL mal escrita cae en la 404 por defecto de Next —en inglés,
 * sin estilo y fuera del documento—, porque el `not-found.tsx` de un segmento solo se
 * activa cuando algo llama a `notFound()`, no cuando la ruta simplemente no coincide.
 */
export default function RutaInexistente(): never {
  notFound();
}
