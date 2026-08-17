"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Retraso en milisegundos, para escalonar elementos de una misma lista. */
  retraso?: number;
  className?: string;
};

/**
 * Revela su contenido con una animación suave la primera vez que entra en pantalla.
 * Si el usuario pidió menos movimiento, `globals.css` desactiva la animación.
 */
export function Revelar({ children, retraso = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // React hidrató: ya hay quien revele el contenido, así que la red de seguridad
    // declarada en el <head> deja de hacer falta.
    const failsafe = (window as { __revelarFailsafe?: number }).__revelarFailsafe;
    if (failsafe) clearTimeout(failsafe);

    const nodo = ref.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "animar-entrada" : "revelar-oculto"} ${className}`}
      style={visible ? { animationDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  );
}
