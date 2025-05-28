import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteCompression()],
  base: "/index.js/",
  build: {
    assetsDir: "assets", // where assets will be placed
    outDir: "dist", // default build folder
    chunkSizeWarningLimit: 800, // (Optional) শুধু ওয়ার্নিং কমানোর জন্য
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("antd")) return "antd-vendor";
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["some-large-library"],
  },
});
