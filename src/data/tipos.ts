/**
 * La forma del contenido del sitio.
 *
 * `es.ts` y `en.ts` implementan este mismo tipo, así que el compilador obliga a que las
 * dos versiones estén completas: si se agrega un campo, falta en un idioma y el build
 * falla. Es la única defensa real contra que una traducción se quede a medias.
 */

export type GrupoHabilidades = {
  categoria: string;
  descripcion: string;
  items: string[];
};

export type Puesto = {
  puesto: string;
  empresa: string;
  periodo: string;
  actual: boolean;
  logros: string[];
  tags: string[];
};

export type Figura = {
  /** Clave del recurso en `comun.ts`: la imagen es la misma en los dos idiomas. */
  recurso: string;
  alt: string;
  pie: string;
  numero: number;
};

export type Proyecto = {
  nombre: string;
  resumen: string;
  rol: string;
  detalles: string[];
  tags: string[];
  destacado: boolean;
  /** Rótulo de la cabecera. Si se omite, se deduce de `destacado`. */
  estado?: string;
  enlace?: string;
  figuras?: Figura[];
};

export type Etapa = { paso: string; detalle: string };

export type CasoDePrueba = {
  id: string;
  titulo: string;
  modulo: string;
  prioridad: string;
  tipo: string;
  precondiciones: string[];
  pasos: string[];
  esperado: string;
  obtenido: string;
  estado: string;
  defecto: string;
};

export type ReporteDefecto = {
  id: string;
  titulo: string;
  severidad: string;
  prioridad: string;
  modulo: string;
  entorno: string;
  pasos: string[];
  esperado: string;
  obtenido: string;
  impacto: string;
  evidencia: string;
};

/** Las ocho secciones del documento, en orden. Alimentan el menú y los títulos. */
export type ClaveSeccion =
  | "perfil"
  | "habilidades"
  | "comoTrabajo"
  | "experiencia"
  | "proyectos"
  | "formacion"
  | "intereses"
  | "contacto";

export type Seccion = {
  titulo: string;
  /** Solo algunas secciones llevan bajada bajo el título. */
  descripcion?: string;
};

export type Contenido = {
  /** Valor del atributo `lang` y de los metadatos. */
  lang: string;
  /** Nombre del idioma en su propia lengua, para el conmutador. */
  nombreIdioma: string;

  titulo: string;
  subtitulo: string;
  ubicacion: string;
  pitch: string;
  lema: string;
  sobreMi: string[];

  secciones: Record<ClaveSeccion, Seccion>;

  paralelo: {
    etiqueta: string;
    titulo: string;
    texto: string;
    columnaPista: string;
    columnaSoftware: string;
    ciclo: { paso: string; pista: string; software: string }[];
  };

  metricas: { valor: string; etiqueta: string; nota: string }[];
  flujoTrabajo: Etapa[];
  casoDePrueba: CasoDePrueba;
  reporteDefecto: ReporteDefecto;
  habilidades: GrupoHabilidades[];
  experiencia: Puesto[];
  proyectos: Proyecto[];
  educacion: {
    titulo: string;
    institucion: string;
    periodo: string;
    distincion?: string;
  };
  certificaciones: { nombre: string; estado: string; anio: string }[];
  idiomas: { idioma: string; nivel: string }[];
  intereses: { titulo: string; detalle: string; datos: string[] }[];

  figuras: {
    retrato: Figura;
    telemetria: Figura;
    piloto: Figura;
    pista: Figura;
  };

  /** Todo lo que el sitio dice por su cuenta, fuera del contenido. */
  ui: {
    saltarAlContenido: string;
    navegacionPrincipal: string;
    abrirMenu: string;
    cerrarMenu: string;
    verCV: string;
    cv: string;
    cambiarIdioma: string;

    encabezadoDocumento: string;
    revision: string;
    contactar: string;
    verCasos: string;
    disponible: string;
    documentoVerificado: string;
    fichaRol: string;
    fichaUbicacion: string;
    fichaCertificacion: string;
    fichaCertificacionValor: string;
    fichaFormacion: string;
    fichaFormacionValor: string;

    figura: string;
    foto: string;
    /** Las comillas del idioma: « » en español, “ ” en inglés. */
    comillas: { abre: string; cierra: string };

    elCicloPasoAPaso: string;
    casoDePrueba: string;
    reporteDefecto: string;
    severidad: string;
    modulo: string;
    prioridad: string;
    precondiciones: string;
    pasos: string;
    resultadoEsperado: string;
    resultadoObtenido: string;
    esperado: string;
    obtenido: string;
    entorno: string;
    pasosParaReproducir: string;
    impacto: string;
    evidenciaAdjunta: string;
    derivoEn: string;

    enCurso: string;
    caso: string;
    destacado: string;
    personal: string;
    rol: string;
    detalle: string;
    verProyecto: string;

    educacion: string;
    certificaciones: string;
    idiomasEtiqueta: string;

    noEncontradoTitulo: string;
    noEncontradoTexto: string;
    volverAlInicio: string;

    contactoDisponible: string;
    contactoNoDisponible: string;
    escribirme: string;
    email: string;
    telefono: string;
    finDelDocumento: string;
  };

  /** Etiquetas propias del CV, que no aparecen en el portafolio. */
  cv: {
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
    /** Nombre con el que el PDF aterriza en el disco de quien lo descarga. */
    archivoPdf: string;
  };
};
