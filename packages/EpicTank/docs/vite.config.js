import { defineConfig } from "vite";
import VueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
export default defineConfig({
  plugins: [VueJsx()],
  server: {
    port: 3100,
  },
  resolve: {
    alias: {
      "@com": path.resolve(__dirname, "./vue"), //把 src 的别名设置为 @
    },
  },
});
