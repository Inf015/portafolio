import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Pruebas de humo: necesitan el sitio levantado. Ver tests/humo/sitio.test.ts. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/humo/**/*.test.ts"],
  },
});
