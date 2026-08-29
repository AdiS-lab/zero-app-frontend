import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   proxy: {
  //     // Short-hand syntax if you only need to forward the request
  //     // '/api': 'http://localhost:5000',

  //     // Detailed configuration
  //     "/api": {
  //       target: "http://localhost:8000", // Your backend API URL
  //       changeOrigin: true, // Necessary for virtual hosted sites
  //       secure: false, // Set to false if using self-signed SSL certificates
  //       rewrite: (path: string) => path.replace("/api", ""),
  //     },
  //   },
  // },
});
