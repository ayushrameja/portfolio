import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// `astro dev` does not run the Worker, so the contact form would 404.
function contactDevApi() {
  return {
    name: "contact-dev-api",
    apply: "serve",
    configureServer(server) {
      const handler = async (req, res, next) => {
        const path = req.url?.split("?")[0];
        if (req.method !== "POST" || (path !== "/api/contact" && path !== "/api/contact/")) return next();
        try {
          const chunks = [];
          for await (const chunk of req) chunks.push(chunk);
          const body = Buffer.concat(chunks);
          const host = req.headers.host || "localhost:4321";
          const type = Array.isArray(req.headers["content-type"]) ? req.headers["content-type"][0] : req.headers["content-type"];
          const { handleDevContact } = await import("./src/server/dev-contact.mjs");
          const response = await handleDevContact(new Request(`http://${host}/api/contact`, {
            method: "POST",
            headers: { "content-type": type || "application/json", origin: `http://${host}` },
            body,
          }));
          res.statusCode = response.status;
          const contentType = response.headers.get("content-type");
          if (contentType) res.setHeader("content-type", contentType);
          res.setHeader("cache-control", "no-store");
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch {
          res.statusCode = 502;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: "Unable to send your message. Please try again or use the email link." }));
        }
      };
      server.middlewares.stack.unshift({ route: "", handle: handler });
    },
  };
}

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
    plugins: [tailwindcss(), contactDevApi()],
  },
});
