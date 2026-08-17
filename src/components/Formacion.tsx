import { certificaciones, educacion, idiomas } from "@/data/perfil";
import { Revelar } from "./Revelar";
import { Seccion } from "./Seccion";

export function Formacion() {
  return (
    <Seccion id="formacion" seccion="6" titulo="Credenciales">
      <div className="border-t border-regla">
        <Revelar>
          <div className="grid gap-x-10 gap-y-2 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
            <p className="etiqueta-campo pt-1">Educación</p>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-serif text-[19px] font-semibold text-tinta">
                  {educacion.titulo}
                </h3>
                {educacion.distincion && (
                  <span className="border border-sello px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-sello">
                    {educacion.distincion}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[14px] text-tinta-media">
                {educacion.institucion}
              </p>
              <p className="mt-1 font-mono text-[12px] nums-tabulares text-tinta-clara">
                {educacion.periodo}
              </p>
            </div>
          </div>
        </Revelar>

        <Revelar retraso={70}>
          <div className="grid gap-x-10 gap-y-2 border-b border-regla-fina py-6 md:grid-cols-[13rem_1fr]">
            <p className="etiqueta-campo pt-1">Certificaciones</p>
            <ul className="space-y-3">
              {certificaciones.map((cert) => (
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
            <p className="etiqueta-campo pt-1">Idiomas</p>
            <ul className="space-y-2.5">
              {idiomas.map((item) => (
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
