import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep every image a real file (no base64 inlining) so the HTML stays small.
    assetsInlineLimit: 0,
  },
});
