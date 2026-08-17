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
};

export default nextConfig;
