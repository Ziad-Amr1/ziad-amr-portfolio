// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // رفع حد التحذير — framer-motion طبيعي يكون كبير
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          "vendor-react": ["react", "react-dom"],

          // Animations
          "vendor-motion": ["framer-motion"],

          // Icons
          "vendor-lucide": ["lucide-react"],
          "vendor-icons": ["react-icons"],

          // Email + toast
          "vendor-email": [
            "@emailjs/browser",
            "react-hot-toast",
          ],
        },
      },
    },
  },
});