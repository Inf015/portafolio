# Portafolio — Oliver Infante

Portafolio personal de Oliver Infante, Ingeniero QA. Construido con Next.js 16 (App Router),
React 19 y Tailwind CSS v4. Está íntegramente en español e inglés, y no usa base de
datos: todo el contenido vive en dos archivos.

Las páginas son estáticas, salvo la ruta que genera el PDF del CV, que necesita
ejecutarse en el servidor.

## Cómo ejecutarlo

```bash
npm run dev     # servidor de desarrollo en http://localhost:3000
npm run build   # build de producción
npm start       # sirve el build de producción
npm run lint    # ESLint
```

## El sitio está en dos idiomas

Español e inglés, completos: el portafolio, el CV y hasta los rótulos de los botones.

Quien llega a la raíz es enviado a uno u otro según el `Accept-Language` de su navegador.
Si elige idioma a mano en el conmutador del menú, esa elección queda en una cookie y manda
sobre la configuración del navegador en las visitas siguientes.

| Ruta | Qué es |
| --- | --- |
| `/` | Redirige a `/es` o `/en` según el navegador |
| `/es`, `/en` | Portafolio |
| `/es/cv`, `/en/cv` | CV |
| `/es/cv/pdf`, `/en/cv/pdf` | El CV en PDF, generado al vuelo |

La lógica de detección está en `src/proxy.ts`.

## Cómo actualizar el contenido

**Todo el texto vive en dos archivos gemelos: `src/data/es.ts` y `src/data/en.ts`.**
No hace falta tocar los componentes para actualizar la información.

Los dos implementan el tipo `Contenido` de `src/data/tipos.ts`, así que **si agregas un
campo en uno y falta en el otro, el build falla**. Es la única defensa real contra una
traducción a medias — pero el compilador no puede avisarte de que un texto se quedó
desactualizado, así que al cambiar contenido en uno, reflétalo en el otro.

| Qué quieres cambiar | Dónde |
| --- | --- |
| Título, pitch, ubicación | raíz de `es.ts` / `en.ts` |
| Párrafos de "Perfil" | `sobreMi` |
| Títulos y bajadas de las secciones | `secciones` |
| El bloque oscuro (pista ↔ software) | `paralelo` y `lema` |
| Cifras de la portada | `metricas` |
| El ciclo de trabajo | `flujoTrabajo` |
| Las muestras de documentación | `casoDePrueba` y `reporteDefecto` |
| Competencias por categoría | `habilidades` |
| Puestos de trabajo | `experiencia` |
| Casos / proyectos | `proyectos` |
| Educación, certificaciones, idiomas | `educacion`, `certificaciones`, `idiomas` |
| Sección "Fuera del código" | `intereses` |
| Textos de botones, rótulos y etiquetas | `ui` |
| Etiquetas propias del CV | `cv` |

**Lo que no se traduce vive en `src/data/comun.ts`**: nombre, correo, LinkedIn, GitHub, la
insignia de "Disponible" y los archivos de imagen con sus dimensiones. Están ahí para no
tener que cambiarlos en dos sitios. El texto alternativo y el pie de cada figura sí se
traducen, y viven en `figuras` dentro de cada idioma.

### El teléfono

**No está en el repositorio, y es a propósito**: este repo es público, y un número en el
código lo recogen los rastreadores de spam aunque el sitio nunca llegue a mostrarlo.

Para que aparezca en el CV y en la sección de contacto:

```bash
# .env.local — git lo ignora
NEXT_PUBLIC_TELEFONO="+1 809-000-0000"
```

Y pon `perfil.mostrarTelefono` en `true`. En Vercel, la misma variable se define en los
ajustes del proyecto. Sin la variable, activar el interruptor no rompe nada: el bloque de
contacto simplemente no incluye el teléfono.

### Pendientes por completar

- `proyectos` → La Infantería Motorsport — sin `enlace` porque el repositorio es privado.
  Si se publica, al agregar `enlace` aparece solo el botón "Ver proyecto".

### El CV

Las dos versiones renderizan el mismo componente (`src/components/DocumentoCV.tsx`) a
partir del contenido de su idioma, así que no puede desincronizarse del portafolio: es la
misma fuente. El botón de descarga no se imprime.

### Cómo se generan los PDFs

`src/lib/cv-pdf.ts` abre la propia página del CV en un Chromium headless y devuelve el
resultado. **No hay ningún PDF guardado en el repositorio**: se renderiza en cada
descarga, así que no puede quedarse desactualizado respecto a los datos. Editas
`es.ts` o `en.ts`, despliegas, y el siguiente que lo descargue se lleva la versión nueva.

- En Vercel el navegador lo aporta `@sparticuz/chromium`. En local se usa el Chrome,
  Brave, Edge o Chromium que ya esté instalado; si está en una ruta rara, `CHROME_BIN`.
- La CDN cachea el PDF una hora para no arrancar un navegador por descarga. Cada
  despliegue invalida esa caché solo, así que no hay nada que purgar a mano.
- El PDF sale **en blanco**, no con el papel crudo del sitio: Chrome no pinta el área de
  márgenes de `@page`, así que el crema dejaba un marco blanco y cortaba la última página
  donde terminaba el texto. Ver el bloque `@media print` en `globals.css`.

## Estructura

```
src/
├── app/
│   ├── [idioma]/       # el segmento de idioma envuelve todo el sitio
│   │   ├── layout.tsx  # layout raíz: <html lang>, fuentes, metadatos, SEO
│   │   ├── page.tsx    # orden de las secciones del portafolio
│   │   ├── cv/page.tsx # el CV
│   │   └── cv/pdf/     # ruta que devuelve el PDF
│   ├── icon.tsx        # favicon generado
│   └── globals.css     # tema (papel, tinta, tipografía, animaciones)
├── proxy.ts            # detección de idioma y rutas heredadas
├── components/         # una sección por archivo
├── lib/cv-pdf.ts       # render del PDF con Chromium headless
└── data/
    ├── tipos.ts        # la forma del contenido; obliga a que los dos idiomas cuadren
    ├── es.ts, en.ts    # ← todo el texto
    ├── comun.ts        # lo que no se traduce
    └── contenido.ts    # punto de entrada e idiomas
```

> El layout raíz vive en `app/[idioma]/layout.tsx` y **no hay `app/layout.tsx`**. Cuando
> todas las rutas cuelgan de un segmento dinámico, Next toma el layout de ese segmento
> como raíz — que es la única forma de poner el idioma en el `<html>`, porque un layout
> raíz no recibe parámetros.

## Notas de diseño

El sitio está construido como un **documento técnico impreso**, no como una landing page:
papel crudo, tipografía editorial, secciones numeradas como cláusulas (§1, §2…) y una
ficha de datos en el encabezado. La idea es que la forma refleje el oficio — un QA
trabaja en documentos: casos de prueba, reportes de defectos, matrices de trazabilidad.

- **Tipografía**: IBM Plex Serif (títulos), Sans (cuerpo) y Mono (datos y metadatos).
  Es una familia diseñada para documentación de ingeniería.
- **Color**: papel `#f4f1ea` y tinta `#16150f`, con un único acento — el rojo de carrera
  `#c1121f`, que conecta con el mundo del automovilismo.
- **El bloque oscuro** a mitad del documento es el argumento del sitio: el método de
  medición del drag racing y el del QA son el mismo. Es lo que hace que este portafolio
  no sea intercambiable con otro.
- **Accesibilidad**: enlace para saltar al contenido, foco visible, HTML semántico y
  respeto por `prefers-reduced-motion`.
- **Sin JavaScript el sitio se ve completo**: las animaciones de entrada solo ocultan
  contenido cuando el JS está disponible para revelarlo.

### Una trampa a recordar

En `globals.css`, las fuentes se declaran en un bloque `@theme inline` aparte de los
colores. Es obligatorio: `next/font` declara las variables `--fuente-*` en el `<body>`,
no en `:root`. Sin `inline`, Tailwind intentaría resolverlas en `:root`, la familia
entera quedaría inválida y todo el sitio caería al tipo del sistema.

## Despliegue

[Vercel](https://vercel.com): importas el repositorio y no requiere configuración.

**Hace falta un host con funciones serverless de Node.** La ruta `/[idioma]/cv/pdf`
arranca un Chromium para renderizar el PDF, así que un host puramente
estático —GitHub Pages, o Cloudflare Pages sin functions— serviría el resto del sitio
pero devolvería 404 en el botón de descarga del CV. Netlify sirve si se despliega con su
adaptador de Next.

Si algún día se prefiere volver a un sitio 100 % estático, hay que borrar
`src/app/[idioma]/cv/pdf/` y `src/lib/cv-pdf.ts`, y sustituir el botón de descarga de
`DocumentoCV.tsx` por instrucciones de impresión. El proxy de idioma también necesita un
host que lo ejecute.
