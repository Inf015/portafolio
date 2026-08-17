# Portafolio — Oliver Infante

Portafolio personal de Oliver Infante, Ingeniero QA. Construido con Next.js 16 (App Router),
React 19 y Tailwind CSS v4. No usa base de datos: todo el contenido vive en un archivo.

Las páginas son estáticas, salvo las dos rutas que generan el PDF del CV, que necesitan
ejecutarse en el servidor.

## Cómo ejecutarlo

```bash
npm run dev     # servidor de desarrollo en http://localhost:3000
npm run build   # build de producción
npm start       # sirve el build de producción
npm run lint    # ESLint
```

## Cómo actualizar el contenido

**Todo el contenido del sitio vive en un solo archivo: `src/data/perfil.ts`.**
No hace falta tocar los componentes para actualizar la información.

| Qué quieres cambiar | Dónde |
| --- | --- |
| Nombre, título, pitch, contacto | `perfil` |
| Insignia "Disponible" | `perfil.disponible` (`true` / `false`) |
| Mostrar el teléfono en el sitio | `perfil.mostrarTelefono` + `NEXT_PUBLIC_TELEFONO` (ver abajo) |
| Párrafos de "Perfil" | `perfil.sobreMi` |
| El texto del bloque oscuro (pista ↔ software) | `perfil.paralelo` y `perfil.lema` |
| Competencias por categoría | `habilidades` |
| Puestos de trabajo | `experiencia` |
| Casos / proyectos | `proyectos` |
| Educación, certificaciones, idiomas | `educacion`, `certificaciones`, `idiomas` |
| Sección "Fuera del código" | `intereses` |

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

- `sitio` en `src/app/layout.tsx` — pon el dominio definitivo (afecta metadatos y Open Graph).
- `proyectos` → La Infantería Motorsport — sin `enlace` porque el repositorio es privado.
  Si se publica, al agregar `enlace` aparece solo el botón "Ver proyecto".

### El CV, en español e inglés

Cuatro rutas: dos páginas y sus dos PDFs.

| Ruta | Qué es | De dónde sale |
| --- | --- | --- |
| `/cv` | CV en español | Deriva de `src/data/perfil.ts` — nunca se desincroniza |
| `/cv/en` | CV en inglés | Traducción a mano en `cvEn`, dentro de `src/data/cv.ts` |
| `/cv/pdf` | PDF en español | Se genera al vuelo desde `/cv` |
| `/cv/en/pdf` | PDF en inglés | Se genera al vuelo desde `/cv/en` |

Las dos páginas renderizan el mismo componente (`src/components/DocumentoCV.tsx`), con un
conmutador `ES / EN` y un botón de descarga que no se imprimen.

> **Al editar contenido en `perfil.ts`, refleja el cambio en `cvEn`.** Es el único punto
> del proyecto donde el contenido está duplicado, y lo está a propósito: es una
> traducción, no un dato derivable.

### Cómo se generan los PDFs

`src/lib/cv-pdf.ts` abre la propia página del CV en un Chromium headless y devuelve el
resultado. **No hay ningún PDF guardado en el repositorio**: se renderiza en cada
descarga, así que no puede quedarse desactualizado respecto a los datos. Editas
`perfil.ts`, despliegas, y el siguiente que lo descargue se lleva la versión nueva.

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
│   ├── layout.tsx      # metadatos, fuentes, SEO
│   ├── page.tsx        # orden de las secciones
│   ├── icon.tsx        # favicon generado
│   ├── cv/page.tsx     # CV en español
│   ├── cv/en/page.tsx  # CV en inglés
│   ├── cv/pdf/         # rutas que devuelven el PDF de cada idioma
│   └── globals.css     # tema (papel, tinta, tipografía, animaciones)
├── components/         # una sección por archivo
├── lib/cv-pdf.ts       # render del PDF con Chromium headless
└── data/
    ├── perfil.ts       # ← todo el contenido
    └── cv.ts           # las dos versiones del CV (es deriva de perfil.ts; en es traducción)
```

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

**Hace falta un host con funciones serverless de Node.** Las rutas `/cv/pdf` y
`/cv/en/pdf` arrancan un Chromium para renderizar el PDF, así que un host puramente
estático —GitHub Pages, o Cloudflare Pages sin functions— serviría el resto del sitio
pero devolvería 404 en el botón de descarga del CV. Netlify sirve si se despliega con su
adaptador de Next.

Si algún día se prefiere volver a un sitio 100 % estático, hay que borrar
`src/app/cv/pdf/`, `src/app/cv/en/pdf/` y `src/lib/cv-pdf.ts`, y sustituir el botón de
descarga de `DocumentoCV.tsx` por instrucciones de impresión.
