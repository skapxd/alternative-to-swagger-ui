import { defineConfig } from "vitest/config";
import { cwd } from "process";
import { resolve } from "path";
import swc from "unplugin-swc";

const testResultDir = resolve(cwd(), "test-reporter");

const alias = {
  "#": resolve(cwd()),
};

export default defineConfig({
  
  test: {
    typecheck: {
      tsconfig: "./tsconfig.app.json",
      // tsconfig: resolve(cwd(), "tsconfig.app.json"),
      enabled: true
    },
    environment: "happy-dom",
    coverage: {
      enabled: true,
      // provider: 'istanbul',
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: resolve(testResultDir, "coverage"),
      include: ["src/**/*.ts"],
      exclude: ["**/**.module.ts", "**/main.ts"],
    },
    outputFile: resolve(testResultDir, "index.html"),
    reporters: ["default", "html"],
    globals: true,
    root: "./",
  },
  resolve: {
    alias,
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
