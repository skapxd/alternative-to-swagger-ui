import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { cwd } from "process";

const alias = {
  "#": resolve(cwd()),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
});
