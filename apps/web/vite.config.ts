import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["recharts"],
          motion: ["framer-motion"],
          icons: ["lucide-react"]
        }
      }
    }
  },
  server: {
    proxy: {
      "/api": process.env.VITE_API_TARGET || "http://127.0.0.1:8000"
    }
  }
});
