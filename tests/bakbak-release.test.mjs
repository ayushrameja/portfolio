import assert from "node:assert/strict";
import { test } from "node:test";
import {
  parseBakbakRelease,
  getLatestBakbakRelease,
} from "../utils/bakbakRelease.ts";
const release = {
  tag_name: "v2.0.0",
  published_at: "2026-09-19T00:00:00Z",
  html_url: "https://github.com/ayushrameja/bakbak/releases/tag/v2.0.0",
};
const asset = (name) => ({
  name,
  size: 12000000,
  browser_download_url: `https://github.com/ayushrameja/bakbak/releases/download/v2.0.0/${name}`,
});

test("recognizes published macOS and hyphenated Windows installers, not signatures", () => {
  const parsed = parseBakbakRelease({
    ...release,
    assets: [
      asset("Bakbak-2.0.0-windows-x64-setup.exe.sig"),
      asset("Bakbak-2.0.0-windows-x64-setup.exe"),
      asset("Bakbak_2.0.0_aarch64.dmg"),
    ],
  });
  assert.equal(
    parsed.installers.windows.name,
    "Bakbak-2.0.0-windows-x64-setup.exe",
  );
  assert.equal(
    parsed.installers.macAppleSilicon.name,
    "Bakbak_2.0.0_aarch64.dmg",
  );
  assert.equal(parsed.installers.macIntel, null);
});
test("retains support for older underscore installer naming", () => {
  const parsed = parseBakbakRelease({
    ...release,
    assets: [
      asset("Bakbak_0.4.0_x64-setup.exe"),
      asset("Bakbak_0.4.0_x64.dmg"),
    ],
  });
  assert.ok(parsed.installers.windows);
  assert.ok(parsed.installers.macIntel);
});
test("handles missing, malformed, and unavailable asset data", () => {
  for (const data of [null, undefined, [], {}, { ...release, tag_name: 7 }])
    assert.equal(parseBakbakRelease(data), null);
  assert.equal(
    parseBakbakRelease({
      ...release,
      assets: [null, {}, { name: "Bakbak_2.0.0_aarch64.dmg" }],
    }).installers.macAppleSilicon,
    null,
  );
});
test("returns a labelled verified snapshot when the live feed fails", async () => {
  const original = globalThis.fetch;
  try {
    for (const fetcher of [
      async () => {
        throw new Error("offline");
      },
      async () => new Response("{}", { status: 403 }),
      async () => new Response("null"),
    ]) {
      globalThis.fetch = fetcher;
      const result = await getLatestBakbakRelease();
      assert.equal(result.isFallback, true);
      assert.equal(result.version, "2.0.0");
      assert.ok(result.installers.windows);
      assert.ok(result.installers.macAppleSilicon);
    }
  } finally {
    globalThis.fetch = original;
  }
});
test("prefers live releases over the snapshot", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ ...release, tag_name: "v9.0.0" }));
    const result = await getLatestBakbakRelease();
    assert.equal(result.version, "9.0.0");
    assert.equal(result.isFallback, undefined);
  } finally {
    globalThis.fetch = original;
  }
});
