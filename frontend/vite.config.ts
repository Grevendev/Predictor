import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE_PATH || "/",

    plugins: [
      react(),
      tailwindcss()
    ],

    server: {
      port: 5173,
      host: true,

      proxy: {
        "/api": {
          target:
            env.VITE_BACKEND_URL ||
            "http://127.0.0.1:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});