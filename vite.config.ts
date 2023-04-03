/// <reference types="vitest" />
import {defineConfig} from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    include: ["**/src/**/*.test.{js,jsx,ts,tsx}"],
    setupFiles: "./test/setup.js",
    coverage: {
      all: true,
      include: ["**/src/**/*.{js,jsx,ts,tsx}"],
      provider: "c8",
      reporter: ["lcov", "html"],
    },
  },
});
