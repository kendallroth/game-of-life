import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@typings": fileURLToPath(new URL("./src/typings", import.meta.url)),
      "@utilities": fileURLToPath(new URL("./src/utilities", import.meta.url)),
    },
  },
});
