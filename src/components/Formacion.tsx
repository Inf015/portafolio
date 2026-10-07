import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

function Bloque({
  titulo,
  retraso,
  children,
}: {
  titulo: string;
  retraso: number;
  children: React.ReactNode;
}) {
  return (
    <Revelar retraso={retraso} className="h-full">
      <div className="h-full border border-borde-2 bg-panel p-6">
        <h3 className="font-display text-[13.5px] font-semibold text-traza">{titulo}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </Revelar>
  );
}

export function Formacion({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="formacion" {...c.secciones.formacion}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Bloque titulo={c.ui.educacion} retraso={0}>
          <h4 className="font-display text-[1.3rem] font-bold leading-tight tracking-[-0.01em] text-texto">
            {c.educacion.titulo}
          </h4>
          {c.educacion.distincion && (
            <span className="mt-2 inline-block border border-verde px-2.5 py-0.5 font-display text-[13px] font-semibold text-verde">
              {c.educacion.distincion}
            </span>
          )}
          <p className="mt-3 text-[16px] text-[#c3cee0]">{c.educacion.institucion}</p>
          <p className="mt-1 font-display text-[14.5px] tabular-nums text-tenue">
            {c.educacion.periodo}
          </p>
        </Bloque>

        <Bloque titulo={c.ui.certificaciones} retraso={70}>
          <ul className="space-y-4">
            {c.certificaciones.map((cert) => (
              <li key={cert.nombre}>
                <p className="font-display text-[1.15rem] font-bold leading-tight text-texto">
                  {cert.nombre}
                </p>
                <span className="mt-1.5 inline-block border border-ambar px-2.5 py-0.5 font-display text-[13px] font-semibold text-ambar">
                  {cert.estado} · {cert.anio}
                </span>
              </li>
            ))}
          </ul>
        </Bloque>

        <Bloque titulo={c.ui.idiomasEtiqueta} retraso={140}>
          <ul className="space-y-3.5">
            {c.idiomas.map((item) => (
              <li key={item.idioma}>
                <p className="font-display text-[1.15rem] font-bold leading-tight text-texto">
                  {item.idioma}
                </p>
                <p className="mt-0.5 text-[15px] leading-relaxed text-tenue">{item.nivel}</p>
              </li>
            ))}
          </ul>
        </Bloque>
      </div>
    </Seccion>
  );
}
