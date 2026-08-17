import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Pruebas unitarias: no necesitan servidor ni red. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/unidad/**/*.test.ts"],
  },
});
