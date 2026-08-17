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
  outputFileTracingIncludes: {
    "/cv/pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
    "/cv/en/pdf": ["./node_modules/@sparticuz/chromium/bin/**"],
  },

  // Hosts desde los que se permite abrir el servidor de desarrollo sin que Next
  // bloquee sus recursos internos: la red local y los túneles de ngrok, cuyo
  // subdominio cambia en cada sesión del plan gratuito.
  // El `*` cubre el cambio de IP por DHCP dentro de la red local.
  allowedDevOrigins: ["192.168.0.*", "*.ngrok-free.app", "*.ngrok.io"],

  images: {
    // El sitio se sirve como estático (Cloudflare Pages, Netlify…), donde no hay
    // servidor que optimice imágenes al vuelo. Ya se sirven redimensionadas y
    // comprimidas desde /public, así que se entregan tal cual.
    unoptimized: true,
  },
};

export default nextConfig;
