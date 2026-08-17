import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El Chromium que genera el PDF del CV es un binario: si el empaquetador intenta
  // meterlo en el bundle lo rompe. Estos dos se cargan tal cual desde node_modules.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],

  /*
   * Y además hay que subir a mano los archivos de `bin/` —el Chromium comprimido, las
   * fuentes y el sistema base—, porque no se importan: se leen por ruta al ejecutar. El
   * rastreador solo sigue imports, así que sin esto la función se despliega sin el
   * navegador y `executablePath()` revienta nada más entrar. Es exactamente el 500
   * instantáneo que daba /cv/pdf en producción mientras en local funcionaba.
   */
  /*
   * Ojo con la clave: son globs de picomatch, no rutas literales. Escrita como
   * `/[idioma]/cv/pdf`, los corchetes se leen como una clase de caracteres —coincide con
   * `i`, `d`, `o`, `m` o `a`, no con el segmento— y el archivo se despliega sin binario.
   * De ahí que haya que escaparlos.
   */
  outputFileTracingIncludes: {
    "/\\[idioma\\]/cv/pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
  },

  // Hosts desde los que se permite abrir el servidor de desarrollo sin que Next
  // bloquee sus recursos internos: la red local y los túneles de ngrok, cuyo
  // subdominio cambia en cada sesión del plan gratuito.
  // El `*` cubre el cambio de IP por DHCP dentro de la red local.
  allowedDevOrigins: ["192.168.0.*", "*.ngrok-free.app", "*.ngrok.io"],

  // El sitio corre en Vercel, que sí optimiza al vuelo: sirve AVIF o WebP y el tamaño
  // que pida cada pantalla. Estuvo desactivado mientras el destino era un host estático;
  // ya no lo es, y son siete imágenes, muy lejos del límite del plan gratuito.

  async headers() {
    return [{ source: "/:ruta*", headers: CABECERAS_SEGURIDAD }];
  },
};

/*
 * Sobre la Content-Security-Policy: no lleva `script-src`, y es deliberado.
 *
 * Las páginas se prerenderizan en el build, y tanto Next como el script que marca el
 * documento como «con JavaScript» van en línea. Restringir `script-src` de verdad exige
 * un nonce por petición, y un nonce obliga a renderizar cada visita en el servidor —se
 * perdería el prerenderizado de un sitio que es, en esencia, un documento estático—.
 * La alternativa habitual, `script-src 'self' 'unsafe-inline'`, no protege de nada y
 * además aparenta protección, que es peor.
 *
 * Lo que sí se cierra son las vías que no dependen de eso: incrustar el sitio en un
 * iframe ajeno, cargar plugins, reescribir la base de las URLs relativas, enviar
 * formularios a otro origen y abrir conexiones a servidores de terceros.
 */
const CSP = [
  "default-src 'self'",
  "img-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const CABECERAS_SEGURIDAD = [
  { key: "Content-Security-Policy", value: CSP },
  // Redundante con `frame-ancestors`, para navegadores que aún no lo respetan.
  { key: "X-Frame-Options", value: "DENY" },
  // Impide que un .txt subido como imagen se ejecute como script por adivinación de tipo.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Al salir del sitio se manda el origen, nunca la ruta completa.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nada de esto se usa acá; negarlo evita que un script inyectado lo pida.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

export default nextConfig;
