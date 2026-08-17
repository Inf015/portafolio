import { describe, expect, it } from "vitest";
import { esIdioma, IDIOMA_POR_DEFECTO, idiomaPreferido } from "@/data/idiomas";

/**
 * La resolución de idioma decide qué ve alguien que llega por primera vez. Si falla, el
 * error es silencioso: nadie reporta "el sitio me salió en el idioma equivocado", solo
 * se va.
 */
describe("idioma preferido del navegador", () => {
  it("reconoce un idioma que ofrecemos", () => {
    expect(idiomaPreferido("es")).toBe("es");
    expect(idiomaPreferido("en")).toBe("en");
  });

  it("ignora la región: es-DO es español y en-GB es inglés", () => {
    expect(idiomaPreferido("es-DO")).toBe("es");
    expect(idiomaPreferido("en-GB,en")).toBe("en");
  });

  it("respeta el factor de calidad, no el orden de aparición", () => {
    // Este es el caso que motivó ordenar por `q`: el alemán viene primero pero pesa
    // menos, así que la respuesta correcta es inglés y no "ninguno".
    expect(idiomaPreferido("de;q=0.7,en;q=0.9")).toBe("en");
    expect(idiomaPreferido("fr,es;q=0.9,en;q=0.8")).toBe("es");
  });

  it("descarta las preferencias con q=0, que significan «este no»", () => {
    expect(idiomaPreferido("es;q=0,en;q=0.5")).toBe("en");
  });

  it("devuelve null cuando no pide ninguno de los nuestros", () => {
    expect(idiomaPreferido("fr-FR,fr;q=0.9,de;q=0.8")).toBeNull();
    expect(idiomaPreferido("")).toBeNull();
    expect(idiomaPreferido(null)).toBeNull();
  });

  it("no se rompe con cabeceras mal formadas", () => {
    // Un cliente cualquiera puede mandar basura; la respuesta correcta es no elegir,
    // no reventar la petición.
    expect(() => idiomaPreferido(";;;,,,q=")).not.toThrow();
    expect(() => idiomaPreferido("es;q=abc")).not.toThrow();
    expect(idiomaPreferido("es;q=abc")).toBeNull();
  });
});

describe("idioma por defecto", () => {
  it("es uno de los que existen", () => {
    expect(esIdioma(IDIOMA_POR_DEFECTO)).toBe(true);
  });

  it("rechaza cualquier otra cosa", () => {
    for (const valor of ["fr", "ES", "es-DO", "", "pdf", "cv"]) {
      expect(esIdioma(valor)).toBe(false);
    }
  });
});
