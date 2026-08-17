import { describe, expect, it } from "vitest";
import { imagenes } from "@/data/comun";
import { contenido, IDIOMAS, type Idioma } from "@/data/contenido";

/**
 * El contenido está duplicado en dos idiomas a propósito, y el tipo `Contenido` obliga a
 * que ningún campo falte. Lo que el tipo **no** puede detectar es lo que rompe en la
 * práctica: un campo presente pero vacío, una lista con distinta cantidad de elementos en
 * cada idioma, o un texto que se quedó sin traducir. Eso es lo que se prueba acá.
 */

/** Recorre el objeto y devuelve la ruta de cada cadena, para poder señalar la culpable. */
function cadenas(valor: unknown, ruta = ""): [string, string][] {
  if (typeof valor === "string") return [[ruta, valor]];
  if (Array.isArray(valor)) {
    return valor.flatMap((v, i) => cadenas(v, `${ruta}[${i}]`));
  }
  if (valor && typeof valor === "object") {
    return Object.entries(valor).flatMap(([k, v]) =>
      cadenas(v, ruta ? `${ruta}.${k}` : k),
    );
  }
  return [];
}

describe.each(IDIOMAS)("contenido en %s", (idioma: Idioma) => {
  const c = contenido[idioma];

  it("no tiene ningún texto vacío ni en blanco", () => {
    const vacias = cadenas(c)
      .filter(([, texto]) => texto.trim() === "")
      .map(([ruta]) => ruta);
    expect(vacias).toEqual([]);
  });

  it("no tiene marcadores de plantilla sin sustituir", () => {
    // `{rev}` es legítimo en dos cadenas concretas; cualquier otro marcador es un olvido.
    const permitidos = new Set(["ui.revision", "ui.finDelDocumento"]);
    const sospechosas = cadenas(c)
      .filter(([ruta, texto]) => /\{\w+\}/.test(texto) && !permitidos.has(ruta))
      .map(([ruta]) => ruta);
    expect(sospechosas).toEqual([]);
  });

  it("cada figura apunta a una imagen que existe", () => {
    const claves = new Set(Object.keys(imagenes));
    const todas = [
      ...Object.values(c.figuras),
      ...c.proyectos.flatMap((p) => p.figuras ?? []),
    ];
    for (const figura of todas) {
      expect(claves, `figura desconocida: ${figura.recurso}`).toContain(
        figura.recurso,
      );
    }
  });

  it("no repite números de figura", () => {
    const numeros = [
      ...Object.values(c.figuras),
      ...c.proyectos.flatMap((p) => p.figuras ?? []),
    ].map((f) => f.numero);
    expect(new Set(numeros).size).toBe(numeros.length);
  });

  it("todos los enlaces de proyecto son https y sin barra final", () => {
    for (const proyecto of c.proyectos) {
      if (!proyecto.enlace) continue;
      expect(proyecto.enlace, proyecto.nombre).toMatch(/^https:\/\//);
      // El CV los muestra quitando el esquema; una barra final se vería como basura.
      expect(proyecto.enlace.endsWith("/"), proyecto.nombre).toBe(false);
    }
  });

  it("el CV cabe en el nombre de archivo que se descarga", () => {
    expect(c.cv.archivoPdf).toMatch(/^[A-Za-z0-9_.-]+\.pdf$/);
  });
});

describe("los dos idiomas van a la par", () => {
  const [es, en] = [contenido.es, contenido.en];

  it.each([
    ["sobreMi", es.sobreMi.length, en.sobreMi.length],
    ["metricas", es.metricas.length, en.metricas.length],
    ["flujoTrabajo", es.flujoTrabajo.length, en.flujoTrabajo.length],
    ["habilidades", es.habilidades.length, en.habilidades.length],
    ["experiencia", es.experiencia.length, en.experiencia.length],
    ["proyectos", es.proyectos.length, en.proyectos.length],
    ["intereses", es.intereses.length, en.intereses.length],
    ["idiomas", es.idiomas.length, en.idiomas.length],
    ["certificaciones", es.certificaciones.length, en.certificaciones.length],
  ])("%s tiene la misma cantidad de entradas", (_, cuantosEs, cuantosEn) => {
    expect(cuantosEs).toBe(cuantosEn);
  });

  it("los proyectos van en el mismo orden y con el mismo nombre", () => {
    expect(en.proyectos.map((p) => p.nombre)).toEqual(
      es.proyectos.map((p) => p.nombre),
    );
  });

  it("los puestos van en el mismo orden y con la misma empresa", () => {
    expect(en.experiencia.map((p) => p.empresa)).toEqual(
      es.experiencia.map((p) => p.empresa),
    );
  });

  it("cada puesto lista los mismos logros en ambos idiomas", () => {
    for (const [i, puesto] of es.experiencia.entries()) {
      expect(en.experiencia[i].logros.length, puesto.empresa).toBe(
        puesto.logros.length,
      );
    }
  });

  it("los enlaces de cada proyecto coinciden: son el mismo destino", () => {
    for (const [i, proyecto] of es.proyectos.entries()) {
      expect(en.proyectos[i].enlace, proyecto.nombre).toBe(proyecto.enlace);
    }
  });

  it("comparten las mismas claves de imagen", () => {
    const recursos = (c: typeof es) =>
      [
        ...Object.values(c.figuras),
        ...c.proyectos.flatMap((p) => p.figuras ?? []),
      ]
        .map((f) => f.recurso)
        .sort();
    expect(recursos(en)).toEqual(recursos(es));
  });
});

describe("la versión en inglés está realmente traducida", () => {
  const en = contenido.en;

  /*
   * Detecta el olvido típico: copiar un bloque de `es.ts` y no traducirlo. Se buscan
   * palabras funcionales del español, que no aparecen en inglés por casualidad. Los
   * nombres propios que sí son españoles se excluyen por ruta.
   */
  /*
   * Los nombres propios españoles son legítimos dentro de una frase en inglés y hay que
   * quitarlos antes de buscar, o «La Infantería» delata a «la» como artículo. Se filtran
   * por nombre y no por ruta: así siguen cubiertas las frases que los contienen.
   */
  const NOMBRES_PROPIOS = [
    "La Infantería Motorsport",
    "La Infantería",
    "Carga Fácil GHH",
    "Carga Fácil",
    "Instituto Tecnológico de Santo Domingo",
    "Santo Domingo",
    "Pizzería La Piedra",
  ];

  const RUTAS_EXENTAS = [/^lang$/, /^nombreIdioma$/, /^ui\.comillas\./];

  it("no quedan frases en español", () => {
    const palabras =
      /\b(el|la|los|las|un|una|de|del|para|con|que|por|como|desde|sobre|cuando|pero|más|está|son|hay|cada|todo|todos|sitio|archivo|pruebas|correo)\b/i;

    const sinTraducir = cadenas(en)
      .filter(([ruta]) => !RUTAS_EXENTAS.some((r) => r.test(ruta)))
      .filter(([, texto]) => {
        const limpio = NOMBRES_PROPIOS.reduce(
          (acc, nombre) => acc.split(nombre).join(""),
          texto,
        );
        return palabras.test(limpio);
      })
      .map(([ruta, texto]) => `${ruta}: ${texto.slice(0, 60)}`);

    expect(sinTraducir).toEqual([]);
  });

  it("usa comillas inglesas, no las españolas", () => {
    expect(en.ui.comillas.abre).not.toBe("«");
    expect(en.ui.comillas.cierra).not.toBe("»");
  });
});
