import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const script = layout.match(/<script is:inline data-home[^>]*>([\s\S]*?)<\/script>/)[1];
function boot({ hash = '', type = 'reload', reduced = false } = {}) {
  const classes = new Set();
  const root = { dataset: {}, classList: {
    add: name => classes.add(name), contains: name => classes.has(name),
    remove: (...names) => names.forEach(name => classes.delete(name)),
  } };
  const intro = { hidden: false };
  const shell = { inert: true, removeAttribute() { this.inert = false; } };
  const events = {};
  let timeout;
  const window = {
    history: { scrollRestoration: 'auto' }, location: { hash }, scrollY: 1200,
    matchMedia: () => ({ matches: reduced }),
    scrollTo(options) { this.scrollY = options.top; },
    addEventListener(name, callback) { events[name] = callback; },
    setTimeout(callback) { timeout = callback; },
  };
  runInNewContext(script, {
    window,
    performance: { getEntriesByType: () => [{ type }] },
    document: { documentElement: root, currentScript: { getAttribute: () => 'true' }, getElementById: id => id === 'intro' ? intro : shell },
  });
  return { window, root, classes, intro, shell, events, expire: () => timeout() };
}

test('head bootstrap prevents reload scroll restoration before the intro module starts', () => {
  const h = boot();
  assert.equal(h.window.scrollY, 0);
  assert.equal(h.window.history.scrollRestoration, 'manual');
  assert.ok(h.classes.has('intro-pending'));
  h.window.scrollY = 1200; // Late restoration at pageshow.
  h.events.pageshow();
  assert.equal(h.window.scrollY, 0);
  h.expire(); // Module failed to start.
  assert.equal(h.window.history.scrollRestoration, 'auto');
  assert.equal(h.shell.inert, false);
  assert.equal(h.intro.hidden, true);
  assert.equal(h.classes.size, 0);
});

test('deep links, history returns and reduced motion retain native restoration without an intro lock', () => {
  for (const options of [{ hash: '#selected-work' }, { type: 'back_forward' }, { reduced: true }]) {
    const h = boot(options);
    assert.equal(h.classes.has('intro-pending'), false);
    assert.equal(h.window.scrollY, 1200);
    assert.equal(h.window.history.scrollRestoration, 'auto');
  }
});

test('leaving before intro initialization clears the lock for bfcache restoration', () => {
  const h = boot();
  h.events.pagehide();
  h.window.scrollY = 1200;
  h.events.pageshow();
  assert.equal(h.window.scrollY, 1200);
  assert.equal(h.shell.inert, false);
  assert.equal(h.intro.hidden, true);
  assert.equal(h.window.history.scrollRestoration, 'auto');
});
