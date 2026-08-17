# Portfolio — Oliver Infante

[![CI](https://github.com/Inf015/portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Inf015/portafolio/actions/workflows/ci.yml)

Personal portfolio of Oliver Infante, QA Engineer. Built with Next.js 16 (App Router),
React 19 and Tailwind CSS v4. It is fully bilingual — Spanish and English — and uses no
database: all the content lives in two files.

The pages are static, except the route that generates the CV as a PDF, which needs to run
on the server.

## Running it

```bash
npm run dev       # development server at http://localhost:3000
npm run build     # production build
npm start         # serves the production build
npm run lint      # ESLint
npm test          # unit tests
npm run test:humo # smoke tests — needs the site running
npm run test:todo # both suites
```

## Tests

Two suites, because they answer different questions.

**Unit** (`tests/unidad/`) — pure logic and content integrity, no server needed. The type
system already guarantees both languages have every field; these cover what it can't see:
a field that's present but empty, a list with a different number of entries in each
language, a figure pointing at an image that doesn't exist, a project link with a trailing
slash, or a block copied from `es.ts` and left untranslated.

**Smoke** (`tests/humo/`) — against a running site, for what only exists once everything is
assembled: language resolution from `Accept-Language` including quality factors, the legacy
redirects, `hreflang`, the share image, the security headers, the custom 404, and the PDF
actually coming back as a PDF and not as a 200 with an empty body.

```bash
npm run build && npm start
npm run test:humo

# or against production
BASE=https://www.oliver-infante.dev npm run test:humo
```

Every failure these cover is one that actually happened while building this site.

## The site is in two languages

Spanish and English, both complete: the portfolio, the CV, down to the button labels.

Anyone landing on the root is sent to one or the other based on their browser's
`Accept-Language`. If they pick a language by hand in the menu switcher, that choice is
stored in a cookie and overrides the browser setting on later visits.

| Route | What it is |
| --- | --- |
| `/` | Redirects to `/es` or `/en` based on the browser |
| `/es`, `/en` | Portfolio |
| `/es/cv`, `/en/cv` | CV |
| `/es/cv/pdf`, `/en/cv/pdf` | The CV as a PDF, generated on demand |

The detection logic lives in `src/proxy.ts`.

## Updating the content

**All the text lives in two twin files: `src/data/es.ts` and `src/data/en.ts`.**
You never have to touch the components to update the information.

Both implement the `Contenido` type from `src/data/tipos.ts`, so **if you add a field to
one and leave it out of the other, the build fails**. That's the only real defense against
a half-finished translation — but the compiler can't warn you that a text went stale, so
when you change content in one, mirror it in the other.

| What you want to change | Where |
| --- | --- |
| Title, pitch, location | root of `es.ts` / `en.ts` |
| "Profile" paragraphs | `sobreMi` |
| Section titles and standfirsts | `secciones` |
| The dark block (track ↔ software) | `paralelo` and `lema` |
| Front-page figures | `metricas` |
| The work cycle | `flujoTrabajo` |
| The documentation samples | `casoDePrueba` and `reporteDefecto` |
| Skills by category | `habilidades` |
| Jobs | `experiencia` |
| Cases / projects | `proyectos` |
| Education, certifications, languages | `educacion`, `certificaciones`, `idiomas` |
| "Outside the code" section | `intereses` |
| Button text, labels and captions | `ui` |
| Labels specific to the CV | `cv` |

**What doesn't get translated lives in `src/data/comun.ts`**: name, email, LinkedIn,
GitHub, the "Available" badge and the image files with their dimensions. They're there so
you don't have to change them in two places. The alt text and caption of each figure *are*
translated, and live under `figuras` inside each language.

> The codebase is written in Spanish — identifiers, comments and data keys. That's
> deliberate and consistent; only the documentation is in English.

### The phone number

**It isn't in the repository, on purpose**: this repo is public, and a number in the code
gets picked up by spam crawlers even if the site never displays it.

To have it appear on the CV and in the contact section:

```bash
# .env.local — git ignores it
NEXT_PUBLIC_TELEFONO="+1 809-000-0000"
```

And set `perfil.mostrarTelefono` to `true`. On Vercel, the same variable is defined in the
project settings. Without the variable, flipping the switch breaks nothing: the contact
block simply leaves the phone out.

### Still to do

- `proyectos` → La Infantería Motorsport — no `enlace` because the repository is private.
  If it's ever published, adding `enlace` brings back the "View project" button on its own.

### The CV

Both versions render the same component (`src/components/DocumentoCV.tsx`) from their own
language's content, so it can't drift out of sync with the portfolio: it's the same source.
The download button isn't printed.

### How the PDFs are generated

`src/lib/cv-pdf.ts` opens the CV page itself in a headless Chromium and returns the result.
**No PDF is stored in the repository**: it is rendered on every download, so it can never
go stale against the data. You edit `es.ts` or `en.ts`, deploy, and the next person to
download it gets the new version.

- On Vercel the browser comes from `@sparticuz/chromium`. Locally it uses whichever Chrome,
  Brave, Edge or Chromium is already installed; if it sits in an unusual path, `CHROME_BIN`.
- The CDN caches the PDF for an hour so a browser isn't launched per download. Each deploy
  invalidates that cache by itself, so there is nothing to purge by hand.
- The PDF comes out **white**, not on the site's raw paper stock: Chrome doesn't paint the
  `@page` margin area, so the cream left a white frame and cut the last page off where the
  text ended. See the `@media print` block in `globals.css`.

## Structure

```
src/
├── app/
│   ├── [idioma]/       # the language segment wraps the whole site
│   │   ├── layout.tsx  # root layout: <html lang>, fonts, metadata, SEO
│   │   ├── page.tsx    # the order of the portfolio sections
│   │   ├── cv/page.tsx # the CV
│   │   └── cv/pdf/     # route that returns the PDF
│   ├── icon.tsx        # generated favicon
│   └── globals.css     # theme (paper, ink, typography, animations)
├── proxy.ts            # language detection and legacy routes
├── components/         # one section per file
├── lib/cv-pdf.ts       # PDF rendering with headless Chromium
└── data/
    ├── tipos.ts        # the shape of the content; forces both languages to line up
    ├── es.ts, en.ts    # ← all the text
    ├── comun.ts        # what doesn't get translated
    └── contenido.ts    # entry point and languages
```

> The root layout lives at `app/[idioma]/layout.tsx` and **there is no `app/layout.tsx`**.
> When every route hangs off a dynamic segment, Next treats that segment's layout as the
> root — which is the only way to put the language on the `<html>` element, because a root
> layout receives no params.

## Design notes

The site is built as a **printed technical document**, not a landing page: raw paper,
editorial typography, sections numbered like clauses (§1, §2…) and a data sheet in the
header. The idea is that the form reflects the trade — a QA engineer works in documents:
test cases, defect reports, traceability matrices.

- **Typography**: IBM Plex Serif (headings), Sans (body) and Mono (data and metadata). It's
  a family designed for engineering documentation.
- **Color**: paper `#f4f1ea` and ink `#16150f`, with a single accent — the racing red
  `#c1121f`, which ties into the motorsport world.
- **The dark block** halfway down the document is the argument of the site: the measurement
  method of drag racing and of QA are the same one. It's what keeps this portfolio from
  being interchangeable with any other.
- **Accessibility**: skip-to-content link, visible focus, semantic HTML and respect for
  `prefers-reduced-motion`.
- **The site is complete without JavaScript**: the entrance animations only hide content
  when JS is available to reveal it.

### A trap worth remembering

In `globals.css`, the fonts are declared in an `@theme inline` block separate from the
colors. It's mandatory: `next/font` declares the `--fuente-*` variables on `<body>`, not on
`:root`. Without `inline`, Tailwind would try to resolve them against `:root` — where they
don't exist — the whole family would be invalid, and the entire site would fall back to the
system typeface.

## Deployment

[Vercel](https://vercel.com): import the repository, no configuration required.

**A host with Node serverless functions is required.** The `/[idioma]/cv/pdf` route starts
a Chromium to render the PDF, so a purely static host — GitHub Pages, or Cloudflare Pages
without functions — would serve the rest of the site but return 404 on the CV download
button. Netlify works if deployed with its Next adapter.

If a 100% static site is ever preferred again, delete `src/app/[idioma]/cv/pdf/` and
`src/lib/cv-pdf.ts`, and replace the download button in `DocumentoCV.tsx` with printing
instructions. The language proxy also needs a host that will run it.
