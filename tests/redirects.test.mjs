import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { UNMATCHED_ROUTES, WORK_SLUGS, buildRedirectRules, renderRedirects } from "../scripts/legacy-routes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("redirect file matches archived notes, Bakbak, and work pages", () => {
  const rules = buildRedirectRules(root);
  const rendered = renderRedirects(rules);
  const file = readFileSync(join(root, "public/_redirects"), "utf8");
  assert.equal(file, rendered);

  const sources = new Set(rules.map((rule) => rule.source));
  const destinations = new Set(rules.map((rule) => rule.destination));
  assert.equal(rules.length, (1 + 13 + 1 + WORK_SLUGS.length) * 2);

  for (const rule of rules) {
    assert.equal(rule.destination.endsWith("/"), true);
    assert.equal(sources.has(rule.destination), false);
    assert.notEqual(rule.destination, "/");
  }

  assert.equal(destinations.has("/notes/"), true);
  assert.equal(destinations.has("/projects/bakbak/"), true);
  assert.deepEqual(
    rules.filter((rule) => rule.source === "/blogs" || rule.source === "/blogs/").map((rule) => rule.destination),
    ["/notes/", "/notes/"],
  );

  for (const [path] of UNMATCHED_ROUTES) {
    assert.equal(sources.has(path), false);
    assert.equal(sources.has(`${path}/`), false);
  }

  assert.equal(sources.has("/blogs/not-a-note"), false);
  assert.equal(sources.has("/blogs/not-a-note/"), false);
  assert.equal(file.includes("*"), false);
  assert.equal(file.includes(" 302"), false);
  assert.match(file, /\/blogs\/how-to-review-agent-written-prs \/notes\/how-to-review-agent-written-prs\/ 301/);
  assert.match(file, /\/blogs\/how-to-review-agent-written-prs\/ \/notes\/how-to-review-agent-written-prs\/ 301/);
  assert.match(file, /\/bakbak \/projects\/bakbak\/ 301/);
  assert.match(file, /\/bakbak\/ \/projects\/bakbak\/ 301/);
  assert.match(file, /\/work\/masala \/projects\/masala\/ 301/);
});
