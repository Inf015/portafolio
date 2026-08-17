import { ImageResponse } from "next/og";
import { perfil, revision } from "@/data/comun";
import { contenido, esIdioma, IDIOMAS } from "@/data/contenido";

/*
 * La tarjeta que se ve al pegar el enlace en LinkedIn, WhatsApp o Slack.
 *
 * Se genera aquí en vez de guardar un PNG porque el texto cambia con el idioma y con el
 * contenido: un archivo estático habría que rehacerlo a mano cada vez que cambie el
 * título, y el día que se olvide se comparte una tarjeta que ya no dice la verdad.
 *
 * Reproduce el documento impreso del sitio —papel crudo, filete superior, § y ficha de
 * datos— para que quien la ve reconozca la página antes de abrirla.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${perfil.nombre} — ${contenido.es.titulo}`;

export function generateStaticParams() {
  return IDIOMAS.map((idioma) => ({ idioma }));
}

const PAPEL = "#f4f1ea";
const TINTA = "#16150f";
const TINTA_MEDIA = "#4a4739";
const SELLO = "#c1121f";
const REGLA = "#d6d0c2";

export default async function ImagenOG({
  params,
}: {
  params: Promise<{ idioma: string }>;
}) {
  const { idioma } = await params;
  const c = contenido[esIdioma(idioma) ? idioma : "es"];

  const ficha = [
    [c.ui.fichaUbicacion, c.ubicacion],
    [c.ui.fichaCertificacion, c.ui.fichaCertificacionValor],
    [c.ui.fichaFormacion, c.ui.fichaFormacionValor],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPEL,
          color: TINTA,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Cabecera del documento */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: `2px solid ${TINTA}`,
            paddingBottom: 14,
            fontSize: 19,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: TINTA_MEDIA,
          }}
        >
          <span>{c.ui.encabezadoDocumento}</span>
          <span>Rev. {revision}</span>
        </div>

        <div style={{ display: "flex", flex: 1, paddingTop: 44, gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
            >
              {perfil.nombre}
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 38,
                color: TINTA_MEDIA,
                letterSpacing: "-0.01em",
              }}
            >
              {c.titulo} — {c.subtitulo}
            </div>

            {/* El argumento del sitio, no un eslogan de relleno. */}
            <div
              style={{
                display: "flex",
                marginTop: "auto",
                borderLeft: `4px solid ${SELLO}`,
                paddingLeft: 20,
                fontSize: 27,
                fontStyle: "italic",
                color: TINTA,
                lineHeight: 1.35,
              }}
            >
              {c.ui.comillas.abre}
              {c.lema}
              {c.ui.comillas.cierra}
            </div>
          </div>

          {/* Ficha de datos, como en el encabezado del sitio */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 340,
              borderLeft: `1px solid ${REGLA}`,
              paddingLeft: 34,
              gap: 22,
            }}
          >
            {ficha.map(([campo, valor]) => (
              <div key={campo} style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 16,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: SELLO,
                  }}
                >
                  {campo}
                </span>
                <span style={{ fontSize: 22, marginTop: 6, color: TINTA }}>
                  {valor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
