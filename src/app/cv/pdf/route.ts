import { respuestaPdfCV } from "@/lib/cv-pdf";

// Lanza un navegador: necesita Node, no el runtime Edge.
export const runtime = "nodejs";
// Se renderiza contra el sitio desplegado, así que no puede prerenderizarse en el build.
export const dynamic = "force-dynamic";
// Un arranque en frío de Chromium más el render no entran en el límite por defecto.
export const maxDuration = 60;

export function GET(peticion: Request) {
  return respuestaPdfCV(peticion, "es");
}
