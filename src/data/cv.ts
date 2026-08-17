/**
 * El CV en dos idiomas.
 *
 * La versión en español **deriva de `perfil.ts`**: es la misma fuente que alimenta el
 * portafolio, así que nunca se desincroniza. La versión en inglés es una traducción
 * literal escrita a mano — si editas contenido en `perfil.ts`, hay que reflejarlo aquí
 * abajo en `cvEn`. Es el único punto del proyecto donde el contenido está duplicado, y
 * lo está a propósito: traducir en tiempo de ejecución sería peor.
 */

import {
  certificaciones,
  educacion,
  experiencia,
  habilidades,
  idiomas,
  perfil,
  proyectos,
} from "@/data/perfil";

export type IdiomaCV = "es" | "en";

export type DocumentoCV = {
  /** Valor del atributo `lang` del documento. */
  lang: string;
  /** Nombre del idioma en sí mismo, para el conmutador. */
  nombreIdioma: string;
  titulo: string;
  subtitulo: string;
  ubicacion: string;
  pitch: string;
  habilidades: { categoria: string; items: string[] }[];
  experiencia: {
    puesto: string;
    empresa: string;
    periodo: string;
    logros: string[];
  }[];
  proyectos: {
    nombre: string;
    resumen: string;
    rol: string;
    estado?: string;
    enlace?: string;
    tags: string[];
  }[];
  educacion: {
    titulo: string;
    institucion: string;
    periodo: string;
    distincion?: string;
  };
  certificaciones: { nombre: string; estado: string; anio: string }[];
  idiomas: { idioma: string; nivel: string }[];
  /** Todo el texto que pone el documento por su cuenta, fuera del contenido. */
  etiquetas: {
    tituloPagina: string;
    descripcionPagina: string;
    perfil: string;
    competencias: string;
    experiencia: string;
    proyectos: string;
    educacion: string;
    certificaciones: string;
    descargarPdf: string;
    volver: string;
    idiomaDelCv: string;
  };
};

const cvEs: DocumentoCV = {
  lang: "es",
  nombreIdioma: "Español",
  titulo: perfil.titulo,
  subtitulo: perfil.subtitulo,
  ubicacion: perfil.ubicacion,
  pitch: perfil.pitch,
  habilidades,
  experiencia,
  proyectos,
  educacion,
  certificaciones,
  idiomas,
  etiquetas: {
    tituloPagina: "Currículum",
    descripcionPagina: `Currículum de ${perfil.nombre}, ${perfil.titulo}.`,
    perfil: "Perfil",
    competencias: "Competencias",
    experiencia: "Experiencia",
    proyectos: "Proyectos",
    educacion: "Educación",
    certificaciones: "Certificaciones e idiomas",
    descargarPdf: "Descargar PDF",
    volver: "← Portafolio",
    idiomaDelCv: "Idioma del CV",
  },
};

const cvEn: DocumentoCV = {
  lang: "en",
  nombreIdioma: "English",
  titulo: "QA Engineer",
  subtitulo: "Quality, automation and applied AI",
  ubicacion: "Santo Domingo, Dominican Republic",

  pitch:
    "Software Engineer specialized in QA. I design test cases, run regression suites and chase defects down to their root cause — and anything that can be automated, I automate. I come from development, so I understand the code I'm testing.",

  habilidades: [
    {
      categoria: "QA and Testing",
      items: [
        "Manual testing",
        "Functional test cases",
        "Regression testing",
        "Automated E2E testing",
        "pytest",
        "Defect reporting and tracking",
        "Root cause analysis",
        "QA sign-off",
      ],
    },
    {
      categoria: "Automation and AI",
      items: [
        "Agentic systems",
        "Anthropic API",
        "Local models (Ollama)",
        "LLM as a judge",
        "Telegram bots",
        "Process automation",
      ],
    },
    {
      categoria: "Tracking and Management",
      items: ["Azure DevOps", "Jira", "Trello"],
    },
    {
      categoria: "Languages and Frameworks",
      items: [
        "Python",
        "FastAPI",
        "C#",
        ".NET",
        "TypeScript",
        "Next.js",
        "Dart",
        "Flutter",
      ],
    },
    {
      categoria: "Databases",
      items: ["PostgreSQL", "SQL Server", "MySQL", "SQLAlchemy", "Redis"],
    },
    {
      categoria: "Infrastructure and Systems",
      items: [
        "Docker / Compose",
        "Linux (DietPi)",
        "nginx",
        "Celery",
        "SSH",
        "Tailscale",
        "Git / GitHub",
      ],
    },
  ],

  experiencia: [
    {
      puesto: "Junior Developer and IT Support",
      empresa: "Carga Fácil GHH",
      periodo: "Feb 2024 — Present",
      logros: [
        "Developing and maintaining web applications with .NET and C#.",
        "Leading the SEO structure and the design of the company website.",
        "Providing IT support and resolving hardware and software incidents for internal teams.",
      ],
    },
    {
      puesto: "QA Engineer and Mobile Developer",
      empresa: "Focused Project",
      periodo: "Apr 2024 — Jan 2025",
      logros: [
        "Contributing to a cross-platform support system for ADHD patients, psychologists and psychiatrists (Flutter mobile + web).",
        "Writing and executing functional test cases and regression suites for the patient and clinical staff modules.",
        "Reporting and tracking defects end to end in Azure DevOps.",
        "Taking part in sprint planning and in QA sign-off before each release.",
      ],
    },
    {
      puesto: "Systems, Web and Brand Lead",
      empresa: "La Infantería Motorsport",
      periodo: "Ongoing",
      logros: [
        "Building and maintaining the team's web platform on Next.js and Supabase: public site plus an authenticated admin panel.",
        "Backing the site with 72 automated vitest tests across three suites: unit, smoke against a running instance, and security.",
        "Testing the permission model negatively: that the public key cannot write to any table or upload to Storage, and that the data is left intact after the attempt.",
        "Administering the shop's systems and directing brand identity, online presence and results documentation.",
        "Providing technical support for the setup of the shop's Mustang chassis.",
      ],
    },
  ],

  proyectos: [
    {
      nombre: "botqa",
      resumen:
        "End-to-end testing engine for WhatsApp customer-service bots. A local model talks to the bot posing as a real customer, and a second model then grades the conversation against a checklist. It started as a way to test the bot at the company I work for, and I released it as a generic tool.",
      rol: "Author — open source",
      tags: [
        "Node.js",
        "Ollama",
        "E2E Testing",
        "LLM as a judge",
        "WhatsApp",
        "Open Source",
      ],
      enlace: "https://github.com/Inf015/botqa",
    },
    {
      nombre: "Delta",
      resumen:
        "Telemetry analysis platform for sim racing: it turns a session's raw data into concrete answers about where time is lost and which setup change wins it back.",
      rol: "Developer — personal project",
      estado: "In development",
      tags: [
        "FastAPI",
        "PostgreSQL",
        "Celery",
        "Next.js",
        "Docker",
        "pytest",
        "Telemetry",
      ],
      enlace: "https://github.com/Inf015/Delta",
    },
    {
      nombre: "Focused",
      resumen:
        "ADHD support platform connecting patients, psychologists and psychiatrists in a single mobile and web experience. Final degree project.",
      rol: "Mobile Developer and QA",
      tags: ["Flutter", "Dart", "Manual QA", "Azure DevOps", "Healthcare"],
    },
    {
      nombre: "Kepubli",
      resumen:
        "Multi-user Telegram bot running in production with real users. It automates the full e-ink reading pipeline: per-user series tracking, conversion to optimized KEPUB and direct delivery to the reader.",
      rol: "Author and maintainer",
      estado: "In production",
      tags: ["Python", "Telegram Bot API", "Docker", "pytest", "Automation"],
      enlace: "https://t.me/KepubliBot",
    },
    {
      nombre: "La Infantería Motorsport",
      resumen:
        "Web platform for the team and the shop: public site plus an authenticated admin panel on Next.js and Supabase. The permission model isn't documented, it's verified by tests — a security suite asserts the public key cannot write to any table or upload to Storage, and that the data survives the attempt intact.",
      rol: "Development, QA and administration",
      tags: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "vitest",
        "Security testing",
        "RLS",
        "CSP",
      ],
    },
  ],

  educacion: {
    titulo: "B.Sc. in Software Engineering",
    institucion: "INTEC — Instituto Tecnológico de Santo Domingo",
    periodo: "2020 — 2025",
    distincion: "Magna Cum Laude",
  },

  certificaciones: [
    { nombre: "ISTQB Foundation Level", estado: "In progress", anio: "2026" },
  ],

  idiomas: [
    { idioma: "Spanish", nivel: "Native" },
    { idioma: "English", nivel: "B1/B2 — Professional written communication" },
  ],

  etiquetas: {
    tituloPagina: "Résumé",
    descripcionPagina: `Résumé of ${perfil.nombre}, QA Engineer.`,
    perfil: "Profile",
    competencias: "Skills",
    experiencia: "Experience",
    proyectos: "Projects",
    educacion: "Education",
    certificaciones: "Certifications and languages",
    descargarPdf: "Download PDF",
    volver: "← Portfolio",
    idiomaDelCv: "Résumé language",
  },
};

export const cv: Record<IdiomaCV, DocumentoCV> = { es: cvEs, en: cvEn };

/** La ruta de cada versión. El español vive en `/cv` porque es el idioma por defecto. */
export const rutaCV: Record<IdiomaCV, string> = { es: "/cv", en: "/cv/en" };

/** La ruta que devuelve el PDF, generado al vuelo desde la página de al lado. */
export const rutaPdf: Record<IdiomaCV, string> = {
  es: "/cv/pdf",
  en: "/cv/en/pdf",
};

/** Nombre con el que el PDF aterriza en el disco de quien lo descarga. */
export const archivoPdf: Record<IdiomaCV, string> = {
  es: "Oliver_Infante_CV_ES.pdf",
  en: "Oliver_Infante_CV_EN.pdf",
};
