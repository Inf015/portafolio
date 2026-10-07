import { ejecucion, totalAprobadas } from "@/data/comun";
import { contenido, conValores, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";

const numero = new Intl.NumberFormat("en-US");

/** Geometría del lienzo (unidades del viewBox). */
const ANCHO = 1000;
const BASE = 320; // y del cero
const ALTO_UTIL = 270; // alto que ocupa el valor máximo del eje
const X_INICIO = 160;
const X_FIN = 960;

/**
 * La traza de pruebas acumuladas: una línea que sube suite por suite hasta el total y
 * termina en una meta a cuadros. Es el equivalente, en este sitio, a la telemetría de una
 * pasada: no se cuenta lo que se hizo, se muestra el resultado de la corrida.
 *
 * Todo sale de `ejecucion` (comun.ts); el eje se redondea al múltiplo de 500 siguiente.
 */
export function Traza({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];
  const t = c.traza;
  const locale = idioma === "es" ? "es-DO" : "en-US";

  const techo = Math.ceil(totalAprobadas / 500) * 500;
  const y = (valor: number) => BASE - (valor / techo) * ALTO_UTIL;

  const n = ejecucion.suites.length;
  const puntos = ejecucion.suites.map((suite, i) => {
    const acumulado = ejecucion.suites
      .slice(0, i + 1)
      .reduce((suma, s) => suma + s.pruebas, 0);
    return {
      nombre: suite.nombre,
      acumulado,
      x: X_INICIO + (i * (X_FIN - X_INICIO)) / (n - 1),
      y: y(acumulado),
    };
  });

  const trazado = puntos.map((p) => `L${p.x},${p.y.toFixed(1)}`).join(" ");
  const ejes = [];
  for (let g = 0; g <= techo; g += 500) ejes.push(g);

  const fecha = new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${ejecucion.fecha}T00:00:00Z`));

  const aria = conValores(t.aria, {
    detalle: puntos
      .map((p) => `${p.nombre} ${numero.format(p.acumulado)}`)
      .join(", "),
  });

  const ultimo = puntos[puntos.length - 1];

  return (
    <section
      id="traza"
      aria-label={t.etiqueta}
      className="border-y border-borde-2 bg-panel"
    >
      <Revelar>
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-borde py-3.5 font-display text-[13.5px] text-tenue">
            <p>
              <b className="font-semibold text-texto">{t.etiqueta}</b> ·{" "}
              {conValores(t.contexto, { fecha })}
            </p>
            <p>
              {numero.format(ejecucion.fallidas)} {t.fallidas} ·{" "}
              {numero.format(ejecucion.omitidas)} {t.omitidas}
            </p>
          </div>

          <svg
            viewBox={`0 0 ${ANCHO} 340`}
            role="img"
            aria-label={aria}
            className="block h-auto w-full pt-2.5"
          >
            <defs>
              <linearGradient id="traza-relleno" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7fb4ff" stopOpacity=".35" />
                <stop offset="1" stopColor="#7fb4ff" stopOpacity="0" />
              </linearGradient>
              <pattern id="traza-cuadros" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#e9eef6" />
                <rect width="4" height="4" fill="#080c14" />
                <rect x="4" y="4" width="4" height="4" fill="#080c14" />
              </pattern>
            </defs>

            {ejes.map((g) => (
              <g key={g}>
                <line
                  x1="0"
                  x2={ANCHO}
                  y1={y(g)}
                  y2={y(g)}
                  stroke="#1d2a3f"
                  strokeWidth="1"
                />
                <text
                  x="6"
                  y={y(g) - 6}
                  className="max-sm:hidden"
                  fill="#93a3bb"
                  fontSize="12"
                  fontFamily="var(--fuente-display), ui-sans-serif, system-ui, sans-serif"
                >
                  {numero.format(g)}
                </text>
              </g>
            ))}

            <path
              d={`M0,${BASE} ${trazado} L${X_FIN},${BASE} Z`}
              fill="url(#traza-relleno)"
            />
            <path
              d={`M0,${BASE} ${trazado}`}
              fill="none"
              stroke="#7fb4ff"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="traza-linea"
            />

            {/* Meta a cuadros sobre el último punto. */}
            <line
              x1={X_FIN}
              x2={X_FIN}
              y1={BASE}
              y2="16"
              stroke="#e9eef6"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <rect
              x={X_FIN - 12}
              y="8"
              width="40"
              height="24"
              fill="url(#traza-cuadros)"
              stroke="#e9eef6"
              strokeWidth="1"
            />

            {puntos.map((p, i) => {
              const esUltimo = i === n - 1;
              const primero = i === 0;
              return (
                <g key={p.nombre}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={esUltimo ? 7 : 6}
                    fill={esUltimo ? "#38d98a" : "#080c14"}
                    stroke={esUltimo ? "#38d98a" : "#7fb4ff"}
                    strokeWidth="2.5"
                  />
                  <g className="max-sm:hidden" fontFamily="var(--fuente-display), ui-sans-serif, system-ui, sans-serif">
                    <text
                      x={esUltimo ? p.x - 36 : primero ? p.x + 22 : p.x}
                      y={esUltimo ? p.y - 26 : p.y + 30}
                      textAnchor={esUltimo ? "end" : primero ? "start" : "middle"}
                      fill="#e9eef6"
                      fontSize="15"
                      fontWeight="600"
                    >
                      {p.nombre}
                    </text>
                    <text
                      x={esUltimo ? p.x - 36 : primero ? p.x + 22 : p.x}
                      y={esUltimo ? p.y - 10 : p.y + 48}
                      textAnchor={esUltimo ? "end" : primero ? "start" : "middle"}
                      fill="#93a3bb"
                      fontSize="12.5"
                      fontWeight="500"
                    >
                      {numero.format(p.acumulado)}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* En pantallas pequeñas las etiquetas del gráfico no caben: van como lista. */}
          <ol className="grid grid-cols-2 gap-x-6 gap-y-1 pb-4 font-display text-[13px] text-tenue sm:hidden">
            {puntos.map((p) => (
              <li key={p.nombre} className="flex justify-between gap-2 border-b border-borde py-1">
                <span>{p.nombre}</span>
                <span className="tabular-nums text-texto">{numero.format(p.acumulado)}</span>
              </li>
            ))}
          </ol>

          <dl className="grid grid-cols-3 border-t border-borde">
            <div className="py-4 pr-3 sm:pr-5">
              <dd className="font-display text-[1.7rem] font-bold leading-none tracking-[-0.02em] text-verde sm:text-4xl">
                {numero.format(ultimo.acumulado)}
              </dd>
              <dt className="mt-1.5 text-[13.5px] text-tenue">{t.aprobadas}</dt>
            </div>
            <div className="border-l border-borde px-3 py-4 sm:px-5">
              <dd className="font-display text-[1.7rem] font-bold leading-none tracking-[-0.02em] text-rojo sm:text-4xl">
                {numero.format(ejecucion.fallidas)}
              </dd>
              <dt className="mt-1.5 text-[13.5px] text-tenue">{t.fallidas}</dt>
            </div>
            <div className="border-l border-borde py-4 pl-3 sm:pl-5">
              <dd className="font-display text-[1.7rem] font-bold leading-none tracking-[-0.02em] text-ambar sm:text-4xl">
                {numero.format(ejecucion.omitidas)}
              </dd>
              <dt className="mt-1.5 text-[13.5px] leading-snug text-tenue">
                {t.omitidas}, {t.omitidasNota}
              </dt>
            </div>
          </dl>
        </div>
      </Revelar>
    </section>
  );
}
