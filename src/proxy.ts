import { NextResponse, type NextRequest } from "next/server";
import { esIdioma, IDIOMA_POR_DEFECTO, idiomaPreferido } from "@/data/idiomas";

/** Recuerda la última elección explícita durante un año. */
const COOKIE = "idioma";
const UN_ANIO = 60 * 60 * 24 * 365;

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
