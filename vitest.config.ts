import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // actions.ts crea el cliente de Resend al importar; las pruebas no envían correos.
    env: { RESEND_API_KEY: "re_test_dummy" },
  },
});
