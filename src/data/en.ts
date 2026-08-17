/**
 * El sitio en inglés. Gemelo de `es.ts`.
 *
 * Es traducción escrita a mano, no derivada: al cambiar contenido en `es.ts` hay que
 * reflejarlo aquí. El tipo `Contenido` garantiza que no falte ningún campo, pero no
 * puede avisar de que un texto se quedó desactualizado — eso queda en la disciplina.
 */

import type { Contenido } from "./tipos";

export const en: Contenido = {
  lang: "en",
  nombreIdioma: "English",

  titulo: "QA Engineer",
  subtitulo: "Quality, automation and applied AI",
  ubicacion: "Santo Domingo, Dominican Republic",

  pitch:
    "Software Engineer specialized in QA. I design test cases, run regression suites and chase defects down to their root cause — and anything that can be automated, I automate. I come from development, so I understand the code I'm testing.",

  lema: "What doesn't get measured doesn't get better.",

  sobreMi: [
    "I'm a Software Engineer, Magna Cum Laude from INTEC, and my work moves between two worlds that complement each other: development and quality assurance.",
    "At Focused — a cross-platform support system for ADHD patients, psychologists and psychiatrists — I held both roles: I built the Flutter mobile app and was also responsible for QA. I wrote and ran the functional test cases, put together the regression suites for the patient and clinical staff modules, and tracked defects in Azure DevOps through to closure.",
    "That double perspective is what I bring to a quality team: I can read a stack trace, I understand why a defect happens and not just that it happens, and I write reports a developer can act on without a round trip.",
    "At La Infantería Motorsport I run the team's systems and web platform: a Next.js and Supabase site with an admin panel, backed by 72 automated tests. The suite I care most about is the security one, because it doesn't check that things work — it checks that the things that shouldn't work don't: that the public key cannot write to any table or upload files, and that the data is left intact after the attempt.",
    "Outside formal work, my obsession is making technology work for me. I build bots and agents with language models to automate repetitive tasks, I keep a homelab of Linux nodes self-hosting my own services, and I build my PCs with the same attention to detail I put into a test plan.",
    "Right now I'm building Delta, a telemetry analysis platform for sim racing. It's the project where my two worlds meet completely: software that measures, compares and explains where a tenth of a second goes.",
  ],

  secciones: {
    perfil: { titulo: "Profile" },
    habilidades: {
      titulo: "Skills",
      descripcion:
        "Tools and practices I use daily, grouped by the job they do.",
    },
    comoTrabajo: {
      titulo: "How I work",
      descripcion:
        "A QA portfolio that only lists tools says nothing. This is what I produce: the process, and two real samples of my documentation.",
    },
    experiencia: { titulo: "Experience" },
    proyectos: {
      titulo: "Cases",
      descripcion: "Work where I applied QA and development end to end.",
    },
    formacion: { titulo: "Credentials" },
    intereses: {
      titulo: "Outside the code",
      descripcion:
        "This is where the habit of measuring everything comes from. It isn't filler: it's the same method applied to other things.",
    },
    contacto: { titulo: "Contact" },
  },

  paralelo: {
    etiqueta: "Method",
    titulo: "Why the quarter mile and QA are the same thing",
    texto:
      "In drag racing everything is decided in under eleven seconds, and every tenth comes from a number: reaction time, 60-foot, trap speed. You measure, you adjust the setup, you run again. You never guess. Testing software works exactly the same way — the difference is that on the track a defect costs you the race, and in production it costs you the user.",
    columnaPista: "On the track",
    columnaSoftware: "In software",
    ciclo: [
      { paso: "Measure", pista: "Run telemetry", software: "Test case run" },
      {
        paso: "Diagnose",
        pista: "Where the tenth was lost",
        software: "Root cause of the defect",
      },
      {
        paso: "Adjust",
        pista: "Setup and launch control",
        software: "Fix and regression",
      },
      { paso: "Repeat", pista: "Next pass", software: "Next release" },
    ],
  },

  metricas: [
    {
      valor: "172",
      etiqueta: "automated tests",
      nota: "pytest on Delta and vitest on La Infantería",
    },
    {
      valor: "5",
      etiqueta: "simulators supported",
      nota: "Custom telemetry parsers",
    },
    {
      valor: "10",
      etiqueta: "automated E2E scenarios",
      nota: "Conversational suite graded by an LLM",
    },
    {
      valor: "2+",
      etiqueta: "years in QA and development",
      nota: "Since February 2024",
    },
  ],

  flujoTrabajo: [
    {
      paso: "Analyze",
      detalle:
        "I read the requirement looking for what it doesn't say: what happens with empty data, with different permissions, with the connection down.",
    },
    {
      paso: "Design",
      detalle:
        "I write the cases prioritized by risk. First the flows that, if they break, stop the user.",
    },
    {
      paso: "Execute",
      detalle:
        "I run the suite leaving evidence of every step, so the report doesn't depend on my memory.",
    },
    {
      paso: "Report",
      detalle:
        "I document the defect with reproducible steps and evidence. Where I can, I point at the likely cause.",
    },
    {
      paso: "Verify",
      detalle:
        "I check the fix and run the regression around it: a repair can break what already worked.",
    },
  ],

  casoDePrueba: {
    id: "TC-042",
    titulo:
      "Assign a psychologist to a patient already assigned to another professional",
    modulo: "Patient management",
    prioridad: "High",
    tipo: "Functional · Edge case",
    precondiciones: [
      "An active patient exists with a psychologist already assigned.",
      "The session is signed in with an administrative role holding assignment permission.",
    ],
    pasos: [
      "Open the patient list and select one with an assigned professional.",
      "Go to “Assign professional”.",
      "Pick a psychologist different from the current one and confirm.",
    ],
    esperado:
      "The system warns that the patient already has an assigned professional and requires explicit confirmation before reassigning. The clinical history stays tied to the patient, not to the previous professional.",
    obtenido:
      "The reassignment goes through with no warning, and the history stops showing on the patient's record.",
    estado: "Failed",
    defecto: "DEF-118",
  },

  reporteDefecto: {
    id: "DEF-118",
    titulo:
      "Clinical history disappears from the record when the psychologist is reassigned",
    severidad: "Critical",
    prioridad: "High",
    modulo: "Patient management",
    entorno: "Android 13 · build 1.4.2 · QA environment",
    pasos: [
      "Sign in as an administrator.",
      "Open a patient with a history of at least two recorded sessions.",
      "Reassign the patient to another psychologist and confirm.",
      "Return to the patient's record and open the history tab.",
    ],
    esperado:
      "The history belongs to the patient and stays visible after the reassignment.",
    obtenido:
      "The tab comes up empty. The records are still in the database, but the query filters them by the current professional instead of by the patient.",
    impacto:
      "The incoming professional treats the patient with no clinical background. In a mental health context that is risk to the patient, not an interface annoyance.",
    evidencia:
      "Screen recording of the reproduction, a capture of the empty record, and a SQL query showing the rows are still there.",
  },

  habilidades: [
    {
      categoria: "QA and Testing",
      descripcion: "The core of my day-to-day work.",
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
      descripcion:
        "I build tools to avoid repeating work, including tests where a model grades the result.",
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
      descripcion: "Where the defect lifecycle lives.",
      items: ["Azure DevOps", "Jira", "Trello"],
    },
    {
      categoria: "Languages and Frameworks",
      descripcion: "The development that backs my technical judgment as a tester.",
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
      descripcion:
        "To validate data at the source, not only through the interface.",
      items: ["PostgreSQL", "SQL Server", "MySQL", "SQLAlchemy", "Redis"],
    },
    {
      categoria: "Infrastructure and Systems",
      descripcion:
        "I self-host and administer my own environments: hardware, network and services.",
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
      actual: true,
      logros: [
        "Developing and maintaining web applications with .NET and C#.",
        "Leading the SEO structure and the design of the company website.",
        "Providing IT support and resolving hardware and software incidents for internal teams.",
      ],
      tags: [".NET", "C#", "SEO", "Web design", "IT support"],
    },
    {
      puesto: "QA Engineer and Mobile Developer",
      empresa: "Focused Project",
      periodo: "Apr 2024 — Jan 2025",
      actual: false,
      logros: [
        "Contributing to a cross-platform support system for ADHD patients, psychologists and psychiatrists (Flutter mobile + web).",
        "Writing and executing functional test cases and regression suites for the patient and clinical staff modules.",
        "Reporting and tracking defects end to end in Azure DevOps.",
        "Taking part in sprint planning and in QA sign-off before each release.",
      ],
      tags: ["Manual QA", "Azure DevOps", "Flutter", "Regression"],
    },
    {
      puesto: "Systems, Web and Brand Lead",
      empresa: "La Infantería Motorsport",
      periodo: "Ongoing",
      actual: true,
      logros: [
        "Building and maintaining the team's web platform on Next.js and Supabase: public site plus an authenticated admin panel.",
        "Backing the site with 72 automated vitest tests across three suites: unit, smoke against a running instance, and security.",
        "Testing the permission model negatively: that the public key cannot write to any table or upload to Storage, and that the data is left intact after the attempt.",
        "Administering the shop's systems and directing brand identity, online presence and results documentation.",
        "Providing technical support for the setup of the shop's Mustang chassis.",
      ],
      tags: [
        "Next.js",
        "Supabase",
        "vitest",
        "Security testing",
        "RLS",
        "Brand",
      ],
    },
  ],

  proyectos: [
    {
      nombre: "botqa",
      resumen:
        "End-to-end testing engine for WhatsApp customer-service bots. A local model talks to the bot posing as a real customer, and a second model then grades the conversation against a checklist. It started as a way to test the bot at the company I work for, and I released it as a generic tool.",
      rol: "Author — open source",
      detalles: [
        "Testing a conversational bot by hand doesn't scale, and automating it with text assertions doesn't work either: the correct answer is never literally the same. The way out was to have one model play the customer and another the grader.",
        "Scenarios are JSON files with a persona, a goal and a checklist, so adding a test case doesn't require touching code.",
        "The business context is parameterized: the same engine works for a pizzeria, a clinic or a shop.",
        "Everything runs on local models in Ollama, so no conversation ever leaves the machine.",
        "It produces an HTML report per run with each criterion met or missed, its evidence, and the full transcript. It includes a load-testing mode with photos and voice notes.",
      ],
      tags: [
        "Node.js",
        "Ollama",
        "E2E Testing",
        "LLM as a judge",
        "WhatsApp",
        "Open Source",
      ],
      destacado: true,
      enlace: "https://github.com/Inf015/botqa",
      figuras: [
        {
          recurso: "botqa-reporte",
          alt: "A botqa report showing a test scenario with six graded criteria, three met and three missed, each with its evidence.",
          pie: "Report from a run against a sample business: the incomplete-data scenario exposes three real bot failures, each with the evidence behind it.",
          numero: 3,
        },
      ],
    },
    {
      nombre: "Delta",
      resumen:
        "Telemetry analysis platform for sim racing: it turns a session's raw data into concrete answers about where time is lost and which setup change wins it back.",
      rol: "Developer — personal project",
      detalles: [
        "FastAPI backend with PostgreSQL and asynchronous processing on Celery and Redis, all orchestrated with Docker Compose.",
        "Custom parsers for telemetry and setup files, normalizing track names against an internal database.",
        "Session analysis and lap-to-lap comparison, supported by the Anthropic API to interpret the results.",
        "Next.js frontend with user accounts and separate roles for driver, engineer and administrator.",
        "Backed by a suite of 100 automated pytest tests over the parsers and the analysis engine.",
      ],
      tags: [
        "FastAPI",
        "PostgreSQL",
        "Celery",
        "Next.js",
        "Docker",
        "pytest",
        "Telemetry",
      ],
      destacado: true,
      estado: "In development",
      enlace: "https://github.com/Inf015/Delta",
      figuras: [
        {
          recurso: "delta-telemetria",
          alt: "Telemetry traces of a lap in Delta: speed curve with throttle and brake channels along the circuit.",
          pie: "Traces of a lap at Suzuka: speed on top, throttle and brake below. Every late or early braking point shows at the same place on the track.",
          numero: 4,
        },
        {
          recurso: "delta-reporte",
          alt: "Telemetry report generated by Delta, with session data, best lap, circuit information and sector analysis.",
          pie: "Session report: car and track data, best lap, reference record, and the sector analysis that interprets the numbers.",
          numero: 5,
        },
      ],
    },
    {
      nombre: "Focused",
      resumen:
        "ADHD support platform connecting patients, psychologists and psychiatrists in a single mobile and web experience. Final degree project.",
      rol: "Mobile Developer and QA",
      detalles: [
        "Cross-platform system built with Flutter for mobile, with a web counterpart.",
        "Writing functional test cases for the patient and clinical staff flows.",
        "Running regression suites before each release, tracking defects in Azure DevOps.",
        "Being also the developer of the mobile module, I closed the loop between finding a defect and understanding its root cause.",
      ],
      tags: ["Flutter", "Dart", "Manual QA", "Azure DevOps", "Healthcare"],
      destacado: true,
    },
    {
      nombre: "Kepubli",
      resumen:
        "Multi-user Telegram bot running in production with real users. It automates the full e-ink reading pipeline: per-user series tracking, conversion to optimized KEPUB and direct delivery to the reader.",
      rol: "Author and maintainer",
      detalles: [
        "Multi-user architecture: each person keeps their own library and their own notifications.",
        "Conversion and image-optimization pipeline designed around the limits of electronic paper.",
        "Deployed with Docker on my own infrastructure, with automated pytest tests.",
        "It started from a personal problem and ended up a public product with its own landing page.",
      ],
      tags: ["Python", "Telegram Bot API", "Docker", "pytest", "Automation"],
      destacado: false,
      estado: "In production",
      enlace: "https://kepubli.com",
    },
    {
      nombre: "La Infantería Motorsport",
      resumen:
        "Web platform for the team and the shop: public site plus an authenticated admin panel on Next.js and Supabase. It's the project where my QA work shows best, because the permission model isn't documented — it's verified by tests.",
      rol: "Development, QA and administration",
      detalles: [
        "Public site and admin panel separated by route, with authenticated access and the panel excluded from search engines.",
        "Eight PostgreSQL tables with RLS enabled on all of them: the public key only reads what is published.",
        "72 automated vitest tests across three suites: unit, smoke against a running instance, and security.",
        "The security suite tests negatively: that the public key cannot write to any table, cannot upload to or list Storage, and that the data is left intact after the attempt.",
        "Content-Security-Policy with a nonce, asserted by a test instead of trusting it stays in place.",
      ],
      tags: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "vitest",
        "Security testing",
        "RLS",
        "CSP",
      ],
      destacado: true,
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

  intereses: [
    {
      titulo: "Drag racing",
      detalle:
        "Quarter mile with telemetry and advanced mechanical setups. I work with HP Tuners and bootmod3 on a 2018 Ford Mustang and BMW M4 S58 platforms.",
      datos: ["HP Tuners", "bootmod3", "Telemetry", "Launch control"],
    },
    {
      titulo: "Sim racing",
      detalle:
        "Home simulator with Moza R9 direct-drive hardware and custom wheels. I compete in iRacing, Assetto Corsa and RaceRoom.",
      datos: ["iRacing", "Assetto Corsa", "RaceRoom", "Moza R9"],
    },
    {
      titulo: "Hardware and homelab",
      detalle:
        "Building PCs with liquid cooling and inverted cases, and self-hosted Linux nodes running my own services.",
      datos: ["Custom loop", "Linux", "Docker", "Self-hosting"],
    },
    {
      titulo: "Reading and music",
      detalle:
        "Manga on Kindle and Kobo. In the background, heavy rock, metal and J-rock — and reggaeton when the moment calls for it.",
      datos: ["Manga", "E-ink", "Metal", "J-rock"],
    },
  ],

  figuras: {
    retrato: {
      recurso: "retrato",
      alt: "Portrait of Oliver Infante, QA Engineer.",
      pie: "Oliver Infante — QA Engineer, Santo Domingo.",
      numero: 1,
    },
    telemetria: {
      recurso: "telemetria",
      alt: "Oliver Infante reviewing telemetry data on a laptop, sitting inside the race car in the paddock.",
      pie: "Reading telemetry between passes: the data decides the next adjustment, not intuition.",
      numero: 2,
    },
    piloto: {
      recurso: "piloto",
      alt: "Oliver Infante in a racing suit, holding his helmet in front of a Corvette on the circuit.",
      pie: "Track day with the team.",
      numero: 6,
    },
    pista: {
      recurso: "pista",
      alt: "Black Ford Mustang doing the burnout before a quarter-mile pass, with a wet track and tire smoke.",
      pie: "Burnout before the pass: heating the tire is part of the procedure, not showmanship.",
      numero: 7,
    },
  },

  ui: {
    saltarAlContenido: "Skip to content",
    navegacionPrincipal: "Main navigation",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    verCV: "View résumé",
    cv: "Résumé",
    cambiarIdioma: "Change language",

    encabezadoDocumento: "Professional portfolio",
    revision: "Rev. {rev} · Document 1 of 1",
    contactar: "Get in touch",
    verCasos: "View cases",
    disponible: "Available",
    documentoVerificado: "Document verified and maintained by its author.",
    fichaRol: "Role",
    fichaUbicacion: "Location",
    fichaCertificacion: "Certification",
    fichaCertificacionValor: "ISTQB Foundation · in progress",
    fichaFormacion: "Education",
    fichaFormacionValor: "B.Sc. Software Engineering · INTEC",

    figura: "Fig.",
    foto: "Photo",
    comillas: { abre: "\u201C", cierra: "\u201D" },

    elCicloPasoAPaso: "The cycle, step by step",
    casoDePrueba: "Test case",
    reporteDefecto: "Defect report",
    severidad: "Severity",
    modulo: "Module",
    prioridad: "Priority",
    precondiciones: "Preconditions",
    pasos: "Steps",
    resultadoEsperado: "Expected result",
    resultadoObtenido: "Actual result",
    esperado: "Expected",
    obtenido: "Actual",
    entorno: "Environment",
    pasosParaReproducir: "Steps to reproduce",
    impacto: "Impact",
    evidenciaAdjunta: "Attached evidence",
    derivoEn: "Led to",

    enCurso: "Ongoing",
    caso: "Case",
    destacado: "Featured",
    personal: "Personal",
    rol: "Role",
    detalle: "Detail",
    verProyecto: "View project",

    educacion: "Education",
    certificaciones: "Certifications",
    idiomasEtiqueta: "Languages",

    noEncontradoTitulo: "Page not found",
    noEncontradoTexto:
      "This address doesn't match any section of the document. The link may be mistyped, or the section may no longer exist.",
    volverAlInicio: "Back to the start",

    contactoDisponible:
      "I'm open to opportunities in QA, testing and automation. If you have a role or a project in mind, write to me.",
    contactoNoDisponible:
      "If you'd like to talk about QA, testing or automation, write to me.",
    escribirme: "Write to me",
    email: "Email",
    telefono: "Phone",
    finDelDocumento: "Santo Domingo, DR · Rev. {rev} · End of document",
  },

  cv: {
    tituloPagina: "Résumé",
    descripcionPagina: "Résumé of Oliver Infante, QA Engineer.",
    perfil: "Profile",
    competencias: "Skills",
    experiencia: "Experience",
    proyectos: "Projects",
    educacion: "Education",
    certificaciones: "Certifications and languages",
    descargarPdf: "Download PDF",
    volver: "← Portfolio",
    archivoPdf: "Oliver_Infante_CV_EN.pdf",
  },
};
