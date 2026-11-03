import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sameRoute, prepareDockDeparture, finishDockArrival } from '../src/scripts/dock-route-motion.ts';

test('section navigation ignores fragments and trailing slashes but preserves route/query boundaries', () => {
  const url = path => new URL(path, 'https://ayush.im');
  assert.equal(sameRoute(url('/#home'), url('/#contact')), true);
  assert.equal(sameRoute(url('/notes/#one'), url('/notes#two')), true);
  assert.equal(sameRoute(url('/notes/?page=1'), url('/notes/?page=2')), false);
  assert.equal(sameRoute(url('/notes/'), url('/')), false);
  assert.equal(sameRoute(url('/'), new URL('https://other.example/')), false);
});

test('enabling reduced motion during the page transition cannot strand the dock at icon width', async t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'matchMedia');
  t.after(() => original ? Object.defineProperty(globalThis, 'matchMedia', original) : delete globalThis.matchMedia);
  const preference = { matches: false };
  globalThis.matchMedia = () => preference;
  const dock = { dataset: { visible: 'true' }, isConnected: true };
  let finish;
  finishDockArrival({
    newDocument: { querySelector: () => dock },
    signal: new AbortController().signal,
    viewTransition: { finished: new Promise(resolve => { finish = resolve; }) },
  });
  assert.equal(dock.dataset.routeCollapsed, 'true');
  preference.matches = true;
  finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dock.dataset.routeCollapsed, undefined);
});

test('returning to the home hero does not expand or reveal its hidden dock', async t => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'matchMedia');
  t.after(() => original ? Object.defineProperty(globalThis, 'matchMedia', original) : delete globalThis.matchMedia);
  globalThis.matchMedia = () => ({ matches: false });
  const dock = { dataset: { visible: 'false', expanded: 'false' }, isConnected: true, inert: true };
  let finish;
  finishDockArrival({
    newDocument: { querySelector: () => dock },
    signal: new AbortController().signal,
    viewTransition: { finished: new Promise(resolve => { finish = resolve; }) },
  });
  finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dock.dataset.routeCollapsed, undefined);
  assert.equal(dock.dataset.visible, 'false');
  assert.equal(dock.dataset.expanded, 'false');
  assert.equal(dock.inert, true);
});

test('aborting after the dock collapses restores the full interactive dock', async t => {
  const originals = new Map(['document', 'matchMedia', 'getComputedStyle'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => {
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  const signal = new AbortController();
  let resolveAnimation;
  let resolveLoader;
  let loadingStarted = false;
  const dock = {
    dataset: { visible: 'true' }, clientLeft: 1,
    querySelector: selector => selector === '.dock-logo' ? { offsetWidth: 74 } : null,
    querySelectorAll: () => [],
    getBoundingClientRect: () => ({ width: 430 }),
    animate(frames, options) {
      assert.equal(frames[1].width, '90px');
      assert.equal(options.duration, 480);
      return { finished: new Promise(resolve => { resolveAnimation = resolve; }), cancel() {} };
    },
  };
  Object.assign(globalThis, {
    document: { querySelector: () => dock },
    matchMedia: () => Object.assign(new EventTarget(), { matches: false }),
    getComputedStyle: () => ({ paddingLeft: '7px' }),
  });
  const event = {
    from: new URL('https://ayush.im/notes/'), to: new URL('https://ayush.im/'), signal: signal.signal,
    loader: () => { loadingStarted = true; return new Promise(resolve => { resolveLoader = resolve; }); },
  };
  prepareDockDeparture(event);
  const loading = event.loader();
  assert.equal(loadingStarted, true, 'fetch starts alongside the animation');
  resolveAnimation();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(dock.dataset.routeCollapsed, 'true');
  signal.abort();
  assert.equal(dock.dataset.routeCollapsed, undefined);
  assert.equal(dock.dataset.routeMotion, undefined);
  resolveLoader();
  await loading;
});
