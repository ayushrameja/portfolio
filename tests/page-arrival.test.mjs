import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const bootstrap = layout.match(/<script is:inline data-home[^>]*>([\s\S]*?)<\/script>/)[1];

// Execute the real early bootstrap: a route return must never hide the home
// shell behind the four-second intro or take ownership of scroll restoration.
for (const scenario of [
  { name: 'direct arrival', intro: true },
  { name: 'external arrival', referrer: 'https://example.com/', intro: true },
  { name: 'internal return', referrer: 'https://ayush.im/notes/', intro: false },
  { name: 'activation without referrer', from: 'https://ayush.im/projects/', intro: false },
  { name: 'reload after internal return', referrer: 'https://ayush.im/notes/', type: 'reload', intro: true },
  { name: 'history return', type: 'back_forward', intro: false },
  { name: 'home section deep link', hash: '#experience', intro: false },
  { name: 'reduced motion', reduced: true, intro: false },
  { name: 'non-home arrival', home: false, intro: false },
  { name: 'client navigation after an initial reload', client: true, type: 'reload', intro: false },
]) {
  test(`homepage bootstrap: ${scenario.name}`, () => {
    const classes = new Set();
    const root = {
      dataset: scenario.client ? { clientNavigation: 'true' } : {},
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name),
      },
    };
    const window = {
      location: { origin: 'https://ayush.im', hash: scenario.hash || '' },
      history: { scrollRestoration: 'auto' },
      matchMedia: () => ({ matches: !!scenario.reduced }),
      navigation: scenario.from ? { activation: { from: { url: scenario.from } } } : undefined,
      scrollTo() {}, addEventListener() {}, setTimeout() {},
    };
    runInNewContext(bootstrap, {
      URL, window,
      performance: { getEntriesByType: () => [{ type: scenario.type || 'navigate' }] },
      document: {
        documentElement: root,
        referrer: scenario.referrer || '',
        currentScript: { getAttribute: () => scenario.home === false ? 'false' : 'true' },
        getElementById: () => null,
      },
    });
    assert.equal(classes.has('intro-pending'), scenario.intro);
    assert.equal(window.history.scrollRestoration, scenario.intro ? 'manual' : 'auto');
  });
}
