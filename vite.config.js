import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site from https://<user>.github.io/CV/,
// so all built asset URLs must be rooted at /CV/ rather than /.
export default defineConfig({
  base: "/CV/",
  plugins: [react()],
});
