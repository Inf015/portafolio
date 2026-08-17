import { respuestaPdfCV } from "@/lib/cv-pdf";

// Mismo criterio que la ruta en español; ver src/app/cv/pdf/route.ts.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export function GET(peticion: Request) {
  return respuestaPdfCV(peticion, "en");
}
