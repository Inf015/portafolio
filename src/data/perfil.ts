/**
 * Fuente única de verdad del portafolio.
 * Edita este archivo para actualizar el contenido del sitio; no hace falta tocar los componentes.
 */

export const perfil = {
  nombre: "Oliver Infante",
  titulo: "Ingeniero QA",
  subtitulo: "Calidad, automatización e IA aplicada",
  ubicacion: "Santo Domingo, República Dominicana",
  email: "oliver_jose@live.com",
  /*
   * El teléfono no vive en el repositorio: es público, y un número en el código lo
   * encuentran los rastreadores de spam aunque el sitio nunca lo muestre.
   *
   * Para incluirlo, defínelo como NEXT_PUBLIC_TELEFONO en `.env.local` —que git ignora—
   * y en Vercel como variable de entorno, y pon `mostrarTelefono` en true.
   */
  telefono: process.env.NEXT_PUBLIC_TELEFONO ?? "",
  mostrarTelefono: false,
  // Sin `www` ni barra final: el CV lo muestra tal cual, quitándole solo el esquema.
  linkedin: "https://linkedin.com/in/oliver-infante-perez",
  github: "https://github.com/Inf015",
  // Página del CV, generada desde este mismo archivo: nunca se desincroniza.
  cv: "/cv",
  disponible: true,

  pitch:
    "Ingeniero de Software especializado en QA. Diseño casos de prueba, ejecuto suites de regresión y persigo defectos hasta su causa raíz — y todo lo que puede automatizarse, lo automatizo. Vengo del desarrollo, así que entiendo el código que estoy probando.",

  /** Frase que resume la mentalidad del sitio. Aparece como cierre del perfil. */
  lema: "Lo que no se mide, no se mejora.",

  sobreMi: [
    "Soy Ingeniero de Software egresado Magna Cum Laude del INTEC, y mi trabajo se mueve entre dos mundos que se complementan: el desarrollo y el aseguramiento de calidad.",
    "En Focused, un sistema multiplataforma de apoyo para pacientes con TDAH, psicólogos y psiquiatras, ocupé ambos roles: desarrollé la app móvil en Flutter y a la vez fui responsable del QA. Redacté y ejecuté los casos de prueba funcionales, armé las suites de regresión de los módulos de pacientes y de personal clínico, y di seguimiento a los defectos en Azure DevOps hasta su cierre.",
    "Esa doble perspectiva es lo que traigo a un equipo de calidad: sé leer un stack trace, entiendo por qué ocurre un defecto y no solo que ocurre, y escribo reportes que un desarrollador puede accionar sin ida y vuelta.",
    "En La Infantería Motorsport llevo los sistemas y la plataforma web del equipo: un sitio en Next.js y Supabase con panel de administración, respaldado por 72 pruebas automatizadas. La suite que más me interesa es la de seguridad, porque no comprueba que las cosas funcionen, sino que no funcionen las que no deben: que la clave pública no pueda escribir en ninguna tabla ni subir archivos, y que los datos sigan intactos después del intento.",
    "Fuera del trabajo formal, mi obsesión es hacer que la tecnología trabaje por mí. Construyo bots y agentes con modelos de lenguaje para automatizar tareas repetitivas, mantengo un homelab con nodos Linux donde autoalojo mis propios servicios, y armo mis PCs prestando la misma atención al detalle que le pongo a un plan de pruebas.",
    "Ahora mismo desarrollo Delta, una plataforma de análisis de telemetría para sim racing. Es el proyecto donde mis dos mundos se cruzan por completo: software que mide, compara y explica dónde se pierde una décima.",
  ],

  /**
   * El puente entre las dos mitades del perfil: la pista y el software.
   * Es lo que hace que este portafolio no sea intercambiable con otro.
   */
  paralelo: {
    titulo: "Por qué el cuarto de milla y el QA son lo mismo",
    texto:
      "En drag racing todo se decide en menos de once segundos, y cada décima sale de un dato: tiempo de reacción, 60 pies, velocidad de trampa. Se mide, se ajusta la configuración, se vuelve a correr. Nunca se adivina. Probar software funciona exactamente igual — la diferencia es que en la pista el defecto te cuesta la carrera, y en producción te cuesta el usuario.",
  },
};

/**
 * Cifras verificables del trabajo, para que la sección no dependa de adjetivos.
 * Cada una debe poder respaldarse con algo público o demostrable.
 */
export const metricas = [
  { valor: "172", etiqueta: "pruebas automatizadas", nota: "pytest en Delta y vitest en La Infantería" },
  { valor: "5", etiqueta: "simuladores soportados", nota: "Parsers propios de telemetría" },
  { valor: "10", etiqueta: "escenarios E2E automatizados", nota: "Suite conversacional con evaluación por LLM" },
  { valor: "2+", etiqueta: "años en QA y desarrollo", nota: "Desde febrero de 2024" },
];

/** Las etapas por las que paso al recibir una funcionalidad nueva. */
export const flujoTrabajo = [
  {
    paso: "Analizar",
    detalle:
      "Leo el requerimiento buscando lo que no dice: qué pasa con datos vacíos, con permisos distintos, con la conexión caída.",
  },
  {
    paso: "Diseñar",
    detalle:
      "Escribo los casos priorizando por riesgo. Primero los flujos que, si fallan, detienen al usuario.",
  },
  {
    paso: "Ejecutar",
    detalle:
      "Corro la suite dejando evidencia de cada paso, para que el reporte no dependa de mi memoria.",
  },
  {
    paso: "Reportar",
    detalle:
      "Documento el defecto con pasos reproducibles y evidencia. Si puedo, señalo la causa probable.",
  },
  {
    paso: "Verificar",
    detalle:
      "Reviso la corrección y corro la regresión alrededor: un arreglo puede romper lo que ya funcionaba.",
  },
];

/**
 * Muestras de mi documentación. Son representativas de cómo escribo, tomadas del
 * trabajo en Focused.
 */
export const casoDePrueba = {
  id: "CP-042",
  titulo: "Asignar psicólogo a un paciente ya asignado a otro profesional",
  modulo: "Gestión de pacientes",
  prioridad: "Alta",
  tipo: "Funcional · Caso borde",
  precondiciones: [
    "Existe un paciente activo con un psicólogo ya asignado.",
    "La sesión está iniciada con un rol administrativo con permiso de asignación.",
  ],
  pasos: [
    "Abrir el listado de pacientes y seleccionar uno con profesional asignado.",
    "Entrar a «Asignar profesional».",
    "Elegir un psicólogo distinto al actual y confirmar.",
  ],
  esperado:
    "El sistema advierte que el paciente ya tiene un profesional asignado y exige confirmación explícita antes de reasignar. El historial clínico permanece asociado al paciente, no al profesional anterior.",
  obtenido:
    "La reasignación se ejecuta sin advertencia y el historial deja de mostrarse en la ficha del paciente.",
  estado: "Fallido",
  defecto: "DEF-118",
};

export const reporteDefecto = {
  id: "DEF-118",
  titulo: "El historial clínico desaparece de la ficha al reasignar el psicólogo",
  severidad: "Crítica",
  prioridad: "Alta",
  modulo: "Gestión de pacientes",
  entorno: "Android 13 · build 1.4.2 · ambiente de QA",
  pasos: [
    "Iniciar sesión como administrador.",
    "Abrir un paciente con historial de al menos dos sesiones registradas.",
    "Reasignar el paciente a otro psicólogo y confirmar.",
    "Volver a la ficha del paciente y abrir la pestaña de historial.",
  ],
  esperado:
    "El historial pertenece al paciente y sigue visible después de la reasignación.",
  obtenido:
    "La pestaña aparece vacía. Los registros siguen en la base de datos, pero la consulta los filtra por el profesional actual en vez de por el paciente.",
  impacto:
    "El profesional entrante atiende sin antecedentes clínicos. En un contexto de salud mental, eso es riesgo para el paciente, no una molestia de interfaz.",
  evidencia: "Video de la reproducción, captura de la ficha vacía y consulta SQL mostrando los registros presentes.",
};

export type GrupoHabilidades = {
  categoria: string;
  descripcion: string;
  items: string[];
};

export const habilidades: GrupoHabilidades[] = [
  {
    categoria: "QA y Pruebas",
    descripcion: "El núcleo de mi trabajo diario.",
    items: [
      "Pruebas manuales",
      "Casos de prueba funcionales",
      "Pruebas de regresión",
      "Pruebas E2E automatizadas",
      "pytest",
      "Reporte y seguimiento de defectos",
      "Análisis de causa raíz",
      "Aprobación de QA",
    ],
  },
  {
    categoria: "Automatización e IA",
    descripcion:
      "Construyo herramientas para no repetir trabajo, incluyendo pruebas donde un modelo evalúa el resultado.",
    items: [
      "Sistemas agénticos",
      "API de Anthropic",
      "Modelos locales (Ollama)",
      "LLM como evaluador",
      "Bots de Telegram",
      "Automatización de procesos",
    ],
  },
  {
    categoria: "Gestión y Seguimiento",
    descripcion: "Donde vive el ciclo de vida del defecto.",
    items: ["Azure DevOps", "Jira", "Trello"],
  },
  {
    categoria: "Lenguajes y Frameworks",
    descripcion: "Desarrollo que respalda mi criterio técnico al probar.",
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
    categoria: "Bases de Datos",
    descripcion: "Para validar los datos en el origen, no solo en la interfaz.",
    items: ["PostgreSQL", "SQL Server", "MySQL", "SQLAlchemy", "Redis"],
  },
  {
    categoria: "Infraestructura y Sistemas",
    descripcion:
      "Autoalojo y administro mis propios entornos: hardware, red y servicios.",
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
];

export type Experiencia = {
  puesto: string;
  empresa: string;
  periodo: string;
  actual: boolean;
  logros: string[];
  tags: string[];
};

export const experiencia: Experiencia[] = [
  {
    puesto: "Desarrollador Junior y Soporte TI",
    empresa: "Carga Fácil GHH",
    periodo: "Feb 2024 — Presente",
    actual: true,
    logros: [
      "Desarrollando y manteniendo aplicaciones web con .NET y C#.",
      "Liderando la estructura SEO y el diseño del sitio web de la empresa.",
      "Brindando soporte TI y resolviendo incidencias de hardware y software para equipos internos.",
    ],
    tags: [".NET", "C#", "SEO", "Diseño web", "Soporte TI"],
  },
  {
    puesto: "Ingeniero QA y Desarrollador Móvil",
    empresa: "Focused Project",
    periodo: "Abr 2024 — Ene 2025",
    actual: false,
    logros: [
      "Contribuyendo a un sistema de apoyo multiplataforma para pacientes con TDAH, psicólogos y psiquiatras (Flutter móvil + web).",
      "Redactando y ejecutando casos de prueba funcionales y suites de pruebas de regresión para los módulos de pacientes y de personal clínico.",
      "Reportando y dando seguimiento a defectos de extremo a extremo en Azure DevOps.",
      "Participando en la planificación de sprints y en la aprobación de QA previa a cada entrega.",
    ],
    tags: ["QA Manual", "Azure DevOps", "Flutter", "Regresión"],
  },
  {
    puesto: "Responsable de Sistemas, Web y Marca",
    empresa: "La Infantería Motorsport",
    periodo: "En curso",
    actual: true,
    logros: [
      "Desarrollando y manteniendo la plataforma web del equipo en Next.js y Supabase: sitio público y panel de administración con acceso autenticado.",
      "Respaldando el sitio con 72 pruebas automatizadas en vitest, repartidas en tres suites: unitarias, de humo contra el sitio levantado y de seguridad.",
      "Probando en negativo el modelo de permisos: que la clave pública no pueda escribir en ninguna tabla ni subir al Storage, y que los datos queden intactos tras el intento.",
      "Administrando los sistemas del taller y dirigiendo la identidad de marca, la presencia en línea y la documentación de resultados.",
      "Acompañando técnicamente la puesta a punto de los chasis Mustang del taller.",
    ],
    tags: [
      "Next.js",
      "Supabase",
      "vitest",
      "Pruebas de seguridad",
      "RLS",
      "Marca",
    ],
  },
];

export type Proyecto = {
  nombre: string;
  resumen: string;
  rol: string;
  detalles: string[];
  tags: string[];
  destacado: boolean;
  /** Se muestra en la cabecera del caso. Si se omite, se rotula según `destacado`. */
  estado?: string;
  enlace?: string;
  /**
   * Capturas del producto funcionando. La numeración de figuras del documento es
   * manual y sigue el orden de lectura: §1 Perfil (1), Método (2), §4 Casos (3, 4…),
   * §6 Fuera del código (5). Si agregas una figura, renumera las siguientes.
   */
  figuras?: { src: string; alt: string; pie: string; numero: number; ancho: number; alto: number }[];
};

export const proyectos: Proyecto[] = [
  {
    nombre: "botqa",
    resumen:
      "Motor de pruebas end-to-end para bots de atención por WhatsApp. Un modelo local conversa con el bot haciéndose pasar por un cliente real, y otro evalúa después la conversación contra un checklist. Nació para probar el bot de la empresa donde trabajo y lo publiqué como herramienta genérica.",
    rol: "Autor — código abierto",
    detalles: [
      "Probar un bot conversacional a mano no escala, y automatizarlo con aserciones de texto tampoco funciona: la respuesta correcta nunca es literalmente la misma. La salida fue que un modelo haga de cliente y otro de evaluador.",
      "Los escenarios son archivos JSON con una persona, un objetivo y un checklist, así que agregar un caso de prueba no requiere tocar código.",
      "El contexto del negocio está parametrizado: el mismo motor sirve para una pizzería, una clínica o una tienda.",
      "Todo corre con modelos locales en Ollama, así que ninguna conversación sale de la máquina.",
      "Genera un reporte HTML por corrida con cada criterio cumplido o incumplido, su evidencia y el transcript completo. Incluye un modo de prueba de carga con fotos y notas de voz.",
    ],
    tags: [
      "Node.js",
      "Ollama",
      "Pruebas E2E",
      "LLM como evaluador",
      "WhatsApp",
      "Open Source",
    ],
    destacado: true,
    enlace: "https://github.com/Inf015/botqa",
    figuras: [
      {
        src: "/capturas/botqa-reporte.jpg",
        alt: "Reporte de botqa mostrando un escenario de prueba con seis criterios evaluados, tres cumplidos y tres no cumplidos, cada uno con su evidencia.",
        pie: "Reporte de una corrida sobre un negocio de ejemplo: el escenario de datos incompletos expone tres fallos reales del bot, cada uno con la evidencia que lo respalda.",
        numero: 3,
        ancho: 1200,
        alto: 911,
      },
    ],
  },
  {
    nombre: "Delta",
    resumen:
      "Plataforma de análisis de telemetría para sim racing: convierte los datos crudos de una sesión en respuestas concretas sobre dónde se pierde tiempo y qué ajuste de setup lo recupera.",
    rol: "Desarrollador — proyecto propio",
    detalles: [
      "API en FastAPI con PostgreSQL y procesamiento asíncrono en Celery y Redis, todo orquestado con Docker Compose.",
      "Parsers propios para archivos de telemetría y de setup, con normalización de pistas contra una base de datos interna.",
      "Análisis de sesión y comparación entre vueltas, apoyado por la API de Anthropic para interpretar los resultados.",
      "Frontend en Next.js con cuentas de usuario y roles diferenciados para piloto, técnico y administrador.",
      "Respaldada por una suite de 100 pruebas automatizadas en pytest sobre los parsers y el motor de análisis.",
    ],
    tags: [
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Next.js",
      "Docker",
      "pytest",
      "Telemetría",
    ],
    destacado: true,
    estado: "En desarrollo",
    enlace: "https://github.com/Inf015/Delta",
    figuras: [
      {
        src: "/capturas/delta-telemetria.jpg",
        alt: "Trazas de telemetría de una vuelta en Delta: curva de velocidad y canales de acelerador y freno a lo largo del circuito.",
        pie: "Trazas de una vuelta en Suzuka: velocidad arriba, acelerador y freno abajo. Cada frenada tardía o temprana se ve en el mismo punto del recorrido.",
        numero: 4,
        ancho: 1400,
        alto: 687,
      },
      {
        src: "/capturas/delta-reporte.jpg",
        alt: "Reporte de telemetría generado por Delta, con datos de la sesión, mejor tiempo, información del circuito y análisis por sector.",
        pie: "Reporte de sesión: datos del auto y la pista, mejor tiempo, récord de referencia y el análisis por sector que interpreta los números.",
        numero: 5,
        ancho: 1400,
        alto: 880,
      },
    ],
  },
  {
    nombre: "Focused",
    resumen:
      "Plataforma de apoyo para TDAH que conecta pacientes, psicólogos y psiquiatras en una sola experiencia móvil y web. Proyecto final de grado.",
    rol: "Desarrollador Móvil y QA",
    detalles: [
      "Sistema multiplataforma construido con Flutter para móvil, con una contraparte web.",
      "Redacción de casos de prueba funcionales para los flujos de pacientes y de personal clínico.",
      "Ejecución de suites de regresión antes de cada entrega, con seguimiento de defectos en Azure DevOps.",
      "Al ser también desarrollador del módulo móvil, cerré el ciclo entre detectar un defecto y entender su causa raíz.",
    ],
    tags: ["Flutter", "Dart", "QA Manual", "Azure DevOps", "Salud"],
    destacado: true,
  },
  {
    nombre: "Kepubli",
    resumen:
      "Bot de Telegram multiusuario en producción, con usuarios reales. Automatiza el pipeline completo de lectura en dispositivos e-ink: seguimiento de series por usuario, conversión a KEPUB optimizado y entrega directa al lector.",
    rol: "Autor y mantenedor",
    detalles: [
      "Arquitectura multiusuario: cada persona mantiene su propia biblioteca y sus notificaciones.",
      "Pipeline de conversión y optimización de imágenes pensado para las limitaciones del papel electrónico.",
      "Desplegado con Docker sobre infraestructura propia, con pruebas automatizadas en pytest.",
      "Nació de un problema personal y terminó siendo un producto público con su propia landing.",
    ],
    tags: ["Python", "Telegram Bot API", "Docker", "pytest", "Automatización"],
    destacado: false,
    estado: "En producción",
    enlace: "https://t.me/KepubliBot",
  },
  /*
   * Ocupa el sitio que tenía el homelab. El homelab sigue contándose en «Fuera del
   * código», que es donde encaja: como afición explica de dónde viene el criterio, pero
   * como caso de QA no aporta nada — no hay nada que probar en él.
   *
   * Sin `enlace`: el repositorio es privado y mandar a un reclutador a un 404 es peor
   * que no ofrecer enlace.
   */
  {
    nombre: "La Infantería Motorsport",
    resumen:
      "Plataforma web del equipo y del taller: sitio público y panel de administración autenticado sobre Next.js y Supabase. Es el proyecto donde mejor se ve mi trabajo de QA, porque el modelo de permisos no está documentado, está verificado por pruebas.",
    rol: "Desarrollo, QA y administración",
    detalles: [
      "Sitio público y panel de administración separados por rutas, con acceso autenticado y el panel excluido de los buscadores.",
      "Ocho tablas en PostgreSQL con RLS activo en todas: la clave pública solo lee lo que está publicado.",
      "72 pruebas automatizadas en vitest, repartidas en tres suites: unitarias, de humo contra el sitio levantado y de seguridad.",
      "La suite de seguridad prueba en negativo: que la clave pública no escriba en ninguna tabla, que no pueda subir ni listar el Storage, y que los datos queden intactos después del intento.",
      "Content-Security-Policy con nonce, comprobada por prueba en lugar de confiar en que siga puesta.",
    ],
    tags: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "vitest",
      "Pruebas de seguridad",
      "RLS",
      "CSP",
    ],
    destacado: true,
  },
];

export const educacion = {
  titulo: "Ingeniería de Software",
  institucion: "INTEC — Instituto Tecnológico de Santo Domingo",
  periodo: "2020 — 2025",
  distincion: "Magna Cum Laude",
};

export const certificaciones = [
  {
    nombre: "ISTQB Foundation Level",
    estado: "En progreso",
    anio: "2026",
  },
];

export const idiomas = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "B1/B2 — Comunicación escrita profesional" },
];

/**
 * Sección "fuera del código": lo que explica cómo pienso.
 * No es relleno — es de donde viene la mentalidad de medición.
 */
export const intereses = [
  {
    titulo: "Drag racing",
    detalle:
      "Cuarto de milla con telemetría y configuraciones mecánicas avanzadas. Trabajo con HP Tuners y bootmod3 sobre un Ford Mustang 2018 y plataformas BMW M4 S58.",
    datos: ["HP Tuners", "bootmod3", "Telemetría", "Sistemas de lanzamiento"],
  },
  {
    titulo: "Sim racing",
    detalle:
      "Simulador en casa con hardware direct-drive Moza R9 y volantes personalizados. Compito en iRacing, Assetto Corsa y RaceRoom.",
    datos: ["iRacing", "Assetto Corsa", "RaceRoom", "Moza R9"],
  },
  {
    titulo: "Hardware y homelab",
    detalle:
      "Armado de PCs con enfriamiento líquido y chasis invertidos, y nodos Linux autoalojados corriendo mis propios servicios.",
    datos: ["Custom loop", "Linux", "Docker", "Self-hosting"],
  },
  {
    titulo: "Lectura y música",
    detalle:
      "Manga en Kindle y Kobo. De fondo, heavy rock, metal y J-rock — y también urbano cuando toca.",
    datos: ["Manga", "E-ink", "Metal", "J-rock"],
  },
];
