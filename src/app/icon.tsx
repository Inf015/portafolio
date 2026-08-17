import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon generado: iniciales sobre el fondo oscuro del sitio. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16150f",
          color: "#f4f1ea",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.04em",
        }}
      >
        OI
      </div>
    ),
    size,
  );
}
