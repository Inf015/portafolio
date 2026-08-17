"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { perfil } from "@/data/comun";
import { contenido, IDIOMAS, rutas, type Idioma } from "@/data/contenido";
import type { ClaveSeccion } from "@/data/tipos";

/** Las anclas del documento. El rótulo de cada una sale del contenido traducido. */
const ANCLAS: { id: string; clave: ClaveSeccion; seccion: string }[] = [
  { id: "sobre-mi", clave: "perfil", seccion: "1" },
  { id: "habilidades", clave: "habilidades", seccion: "2" },
  { id: "como-trabajo", clave: "comoTrabajo", seccion: "3" },
  { id: "experiencia", clave: "experiencia", seccion: "4" },
  { id: "proyectos", clave: "proyectos", seccion: "5" },
  { id: "formacion", clave: "formacion", seccion: "6" },
  { id: "intereses", clave: "intereses", seccion: "7" },
  { id: "contacto", clave: "contacto", seccion: "8" },
];

/**
 * Conmutador de idioma. Cambia el prefijo de la ruta actual conservando el resto, así
 * que desde el CV en español se llega al CV en inglés y no a la portada.
 */
function SelectorIdioma({ actual }: { actual: Idioma }) {
  const rutaActual = usePathname();

  return (
    <div className="flex items-center gap-1">
      {IDIOMAS.map((idioma) => {
        const activo = idioma === actual;
        const destino = rutaActual.replace(`/${actual}`, `/${idioma}`);

        return (
          <Link
            key={idioma}
            href={activo ? rutaActual : destino}
            hrefLang={idioma}
            aria-current={activo ? "true" : undefined}
            className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
              activo ? "text-sello" : "text-tinta-clara hover:text-tinta"
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
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        desplazado || abierto
          ? "border-regla bg-papel/92 backdrop-blur-sm"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label={c.ui.navegacionPrincipal}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-3.5 lg:px-10"
      >
        <a href="#inicio" className="group flex items-baseline gap-2.5">
          <span className="font-serif text-[15px] font-semibold tracking-tight text-tinta">
            {perfil.nombre}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.12em] text-tinta-clara sm:inline">
            QA
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {ANCLAS.map((ancla) => (
            <li key={ancla.id}>
              <a
                href={`#${ancla.id}`}
                className="group flex items-baseline gap-1.5 text-[13px] text-tinta-media transition-colors hover:text-sello"
              >
                <span className="font-mono text-[10px] text-tinta-clara transition-colors group-hover:text-sello">
                  §{ancla.seccion}
                </span>
                {c.secciones[ancla.clave].titulo}
              </a>
            </li>
          ))}
          <li>
            <Link
              href={rutas.cv(idioma)}
              className="border border-tinta px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-tinta transition-colors hover:bg-tinta hover:text-papel-alto"
            >
              {c.ui.cv}
            </Link>
          </li>
          <li>
            <SelectorIdioma actual={idioma} />
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <SelectorIdioma actual={idioma} />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? c.ui.cerrarMenu : c.ui.abrirMenu}
            className="flex h-8 w-8 items-center justify-center border border-regla text-tinta-media transition-colors hover:border-tinta hover:text-tinta"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
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
        <div id="menu-movil" className="border-t border-regla-fina md:hidden">
          <ul className="mx-auto w-full max-w-6xl divide-y divide-regla-fina px-6">
            {ANCLAS.map((ancla) => (
              <li key={ancla.id}>
                <a
                  href={`#${ancla.id}`}
                  onClick={() => setAbierto(false)}
                  className="flex items-baseline gap-2.5 py-3 text-sm text-tinta-media"
                >
                  <span className="font-mono text-[10px] text-tinta-clara">
                    §{ancla.seccion}
                  </span>
                  {c.secciones[ancla.clave].titulo}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={rutas.cv(idioma)}
                onClick={() => setAbierto(false)}
                className="block py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-sello"
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
