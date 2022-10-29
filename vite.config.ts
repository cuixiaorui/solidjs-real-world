/// <reference types="vitest" />

import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  test: {
    environment: "happy-dom",
    setupFiles:"./vitest.setup.ts"
  },
  build: {
    target: "esnext",
  },
});
