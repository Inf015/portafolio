import { contenido, type Idioma } from "@/data/contenido";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Formacion({ idioma }: { idioma: Idioma }) {
  const c = contenido[idioma];

  return (
    <Seccion id="formacion" seccion="6" {...c.secciones.formacion}>
      <div className="border-t border-regla">
        <Revelar>
          <div className="grid gap-x-10 gap-y-2 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
            <p className="etiqueta-campo pt-1">{c.ui.educacion}</p>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-[19px] font-semibold text-tinta">
                  {c.educacion.titulo}
                </h3>
                {c.educacion.distincion && (
                  <span className="border border-sello px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sello">
                    {c.educacion.distincion}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[14px] text-tinta-media">
                {c.educacion.institucion}
              </p>
              <p className="mt-1 font-mono text-[12px] nums-tabulares text-tinta-clara">
                {c.educacion.periodo}
              </p>
            </div>
          </div>
        </Revelar>

        <Revelar retraso={70}>
          <div className="grid gap-x-10 gap-y-2 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
            <p className="etiqueta-campo pt-1">{c.ui.certificaciones}</p>
            <ul className="space-y-3">
              {c.certificaciones.map((cert) => (
                <li
                  key={cert.nombre}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-serif text-[19px] font-semibold text-tinta">
                    {cert.nombre}
                  </span>
                  <span className="border border-regla px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-tinta-clara">
                    {cert.estado} · {cert.anio}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        <Revelar retraso={140}>
          <div className="grid gap-x-10 gap-y-2 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
            <p className="etiqueta-campo pt-1">{c.ui.idiomasEtiqueta}</p>
            <ul className="space-y-2.5">
              {c.idiomas.map((item) => (
                <li key={item.idioma} className="flex flex-wrap gap-x-3">
                  <span className="font-serif text-[17px] font-semibold text-tinta">
                    {item.idioma}
                  </span>
                  <span className="text-[14px] leading-relaxed text-tinta-media">
                    {item.nivel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Revelar>
      </div>
    </Seccion>
  );
}
