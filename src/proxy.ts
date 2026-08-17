import { NextResponse, type NextRequest } from "next/server";
import { esIdioma, IDIOMA_POR_DEFECTO, type Idioma } from "@/data/idiomas";

/** Recuerda la última elección explícita durante un año. */
const COOKIE = "idioma";
const UN_ANIO = 60 * 60 * 24 * 365;

/**
 * Lee la cabecera `Accept-Language` respetando los factores de calidad.
 *
 * El navegador manda algo como `en-US,en;q=0.9,es;q=0.8`: una lista de preferencias
 * ordenada. Quedarse con el primero sería suficiente casi siempre, pero ordenar por `q`
 * acierta también cuando el idioma preferido es uno que no ofrecemos.
 */
function idiomaPreferido(cabecera: string | null): Idioma | null {
  if (!cabecera) return null;

  const preferencias = cabecera
    .split(",")
    .map((parte) => {
      const [etiqueta, ...parametros] = parte.trim().split(";");
      const q = parametros
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return {
        // `es-DO` y `en-GB` cuentan como `es` e `en`.
        base: etiqueta.trim().toLowerCase().split("-")[0],
        q: q === undefined ? 1 : Number.parseFloat(q),
      };
    })
    .filter((p) => Number.isFinite(p.q) && p.q > 0)
    .sort((a, b) => b.q - a.q);

  return preferencias.find((p) => esIdioma(p.base))?.base as Idioma | undefined ?? null;
}

export function proxy(peticion: NextRequest) {
  const { pathname, search } = peticion.nextUrl;

  /*
   * Rutas de la versión anterior, cuando el sitio era solo en español y el CV en inglés
   * colgaba de él. Estuvieron públicas y pueden estar compartidas por ahí, así que se
   * redirigen en vez de romperse.
   */
  const heredadas: Record<string, string> = {
    "/cv": "/es/cv",
    "/cv/pdf": "/es/cv/pdf",
    "/cv/en": "/en/cv",
    "/cv/en/pdf": "/en/cv/pdf",
  };
  if (pathname in heredadas) {
    return NextResponse.redirect(
      new URL(heredadas[pathname] + search, peticion.url),
    );
  }

  // Ya viene con idioma: no hay nada que decidir.
  const primerSegmento = pathname.split("/")[1];
  if (esIdioma(primerSegmento)) {
    /*
     * Se guarda como elección para las próximas visitas a la raíz. Entrar por `/en`
     * —desde el conmutador o desde un enlace compartido— es una señal más fuerte que
     * la configuración del navegador, y sin esto la raíz volvería a mandarte al otro.
     */
    const respuesta = NextResponse.next();
    if (peticion.cookies.get(COOKIE)?.value !== primerSegmento) {
      respuesta.cookies.set(COOKIE, primerSegmento, {
        maxAge: UN_ANIO,
        sameSite: "lax",
        path: "/",
      });
    }
    return respuesta;
  }

  const elegido = peticion.cookies.get(COOKIE)?.value;
  const idioma =
    (elegido && esIdioma(elegido) ? elegido : null) ??
    idiomaPreferido(peticion.headers.get("accept-language")) ??
    IDIOMA_POR_DEFECTO;

  return NextResponse.redirect(
    new URL(`/${idioma}${pathname === "/" ? "" : pathname}${search}`, peticion.url),
  );
}

export const config = {
  /*
   * Fuera todo lo que no es una página: los recursos de Next, el favicon generado y
   * cualquier archivo con extensión dentro de `public/`. Sin esto, una imagen acabaría
   * redirigida a `/es/fotos/retrato.jpg`, que no existe.
   */
  matcher: ["/((?!_next|icon|.*\\.[\\w]+$).*)"],
};
