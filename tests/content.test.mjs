import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const projectsDir = join(dirname(fileURLToPath(import.meta.url)), "../src/content/projects");

function read(name) {
  return readFileSync(join(projectsDir, name), "utf8");
}

test("project records keep public copy and drop excluded work", () => {
  const names = readdirSync(projectsDir);
  assert.equal(names.includes("low-hp-studio.md"), true);
  assert.equal(names.some((name) => /typerush|receipt/i.test(name)), false);

  const studio = read("low-hp-studio.md");
  assert.match(studio, /title: "Low HP Studio"/);
  assert.match(
    studio,
    /summary: "I founded Low HP Studio as a place to build games, websites, and ideas I can't quite leave alone."/,
  );
  assert.match(studio, /href: "https:\/\/lowhp.studio\/"/);
  assert.match(studio, /^Burnhop, Greytrace, and Templio live in that world\.$/m);
  assert.equal(studio.includes("status:"), false);

  const keybrawl = read("keybrawl.md");
  assert.match(keybrawl, /summary: "An experiment in competitive typing."/);
  assert.equal(/typerush/i.test(keybrawl), false);

  const bakbak = read("bakbak.md");
  assert.equal(bakbak.includes("The image shows"), false);
  assert.match(bakbak, /The release page has the published build\./);

  const masala = read("masala.md");
  assert.equal(/pictured|screenshot/i.test(masala), false);
  assert.match(masala, /Live client website with menu browsing and reservation contact links\./);

  const combined = names.map((name) => read(name)).join("\n");
  assert.equal(/receipt creator|receipts\.lowhp/i.test(combined), false);
});
