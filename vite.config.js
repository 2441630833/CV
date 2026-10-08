import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The site is served from the custom domain root (https://longze.si/),
// so built asset URLs must be rooted at / rather than /CV/.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
