import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRedirectRules, renderRedirects } from "./legacy-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rules = buildRedirectRules(root);
writeFileSync(join(root, "public/_redirects"), renderRedirects(rules));
