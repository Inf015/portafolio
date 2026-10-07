"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { perfil } from "@/data/comun";
import { contenido, IDIOMAS, rutas, type Idioma } from "@/data/contenido";
import type { ClaveSeccion } from "@/data/tipos";

/** Las anclas de la portada. El rótulo de cada una sale del contenido traducido. */
const ANCLAS: { id: string; clave: ClaveSeccion }[] = [
  { id: "sobre-mi", clave: "perfil" },
  { id: "habilidades", clave: "habilidades" },
  { id: "como-trabajo", clave: "comoTrabajo" },
  { id: "experiencia", clave: "experiencia" },
  { id: "proyectos", clave: "proyectos" },
  { id: "formacion", clave: "formacion" },
  { id: "intereses", clave: "intereses" },
  { id: "contacto", clave: "contacto" },
];

/**
 * Conmutador de idioma. Cambia el prefijo de la ruta actual conservando el resto, así
 * que desde el CV en español se llega al CV en inglés y no a la portada.
 */
function SelectorIdioma({ actual }: { actual: Idioma }) {
  const rutaActual = usePathname();

  return (
    <div className="flex items-center gap-0.5">
      {IDIOMAS.map((idioma) => {
        const activo = idioma === actual;
        const destino = rutaActual.replace(`/${actual}`, `/${idioma}`);

        return (
          <Link
            key={idioma}
            href={activo ? rutaActual : destino}
            hrefLang={idioma}
            aria-current={activo ? "true" : undefined}
            className={`px-2 py-1.5 font-display text-[13px] font-medium uppercase transition-colors ${
              activo ? "text-traza" : "text-tenue hover:text-texto"
            }`}
          >
            <span aria-hidden="true">{idioma}</span>
            <span className="sr-only">{contenido[idioma].nombreIdioma}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Nav({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const [desplazado, setDesplazado] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 24);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-noche/90 backdrop-blur-md transition-colors duration-300 ${
        desplazado || abierto ? "border-borde" : "border-transparent"
      }`}
    >
      <nav
        aria-label={c.ui.navegacionPrincipal}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3 lg:px-10"
      >
        <a href="#inicio" className="font-display text-[17px] font-bold tracking-tight text-texto">
          {perfil.nombre}
        </a>

        <ul className="hidden items-center gap-5 xl:flex">
          {ANCLAS.map((ancla) => (
            <li key={ancla.id}>
              <a
                href={`#${ancla.id}`}
                className="font-display text-[14px] font-medium text-tenue transition-colors hover:text-texto"
              >
                {c.secciones[ancla.clave].titulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={rutas.cv(idioma)}
            className="hidden border border-borde-2 px-3 py-1.5 font-display text-[13px] font-semibold text-texto transition-colors hover:border-texto hover:bg-texto hover:text-noche sm:block"
          >
            {c.ui.cv}
          </Link>
          <SelectorIdioma actual={idioma} />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? c.ui.cerrarMenu : c.ui.abrirMenu}
            className="flex h-9 w-9 items-center justify-center border border-borde-2 text-tenue transition-colors hover:border-texto hover:text-texto xl:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              {abierto ? (
                <>
                  <path d="M4 4l8 8" />
                  <path d="M12 4l-8 8" />
                </>
              ) : (
                <>
                  <path d="M2.5 5h11" />
                  <path d="M2.5 11h11" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {abierto && (
        <div id="menu-movil" className="border-t border-borde bg-noche xl:hidden">
          <ul className="mx-auto w-full max-w-6xl divide-y divide-borde px-6">
            {ANCLAS.map((ancla) => (
              <li key={ancla.id}>
                <a
                  href={`#${ancla.id}`}
                  onClick={() => setAbierto(false)}
                  className="block py-3.5 font-display text-[16px] font-medium text-tenue transition-colors hover:text-texto"
                >
                  {c.secciones[ancla.clave].titulo}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={rutas.cv(idioma)}
                onClick={() => setAbierto(false)}
                className="block py-3.5 font-display text-[16px] font-semibold text-traza"
              >
                {c.ui.verCV}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
