import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// Static output is Astro's default. The Cloudflare adapter is only required
// for on-demand rendering, which this site does not use.
// https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
// https://docs.astro.build/en/guides/integrations-guide/cloudflare/
export default defineConfig({
  site: "https://ayush.im",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
