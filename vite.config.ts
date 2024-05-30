import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:8082/', // Замените на URL вашего бэкенд-сервера
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Удалить '/api' из пути запроса
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  plugins: [vue()],
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
