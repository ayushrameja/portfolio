import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setupProjectMosaic } from '../src/scripts/project-mosaic.ts';

function harness(t, { pending = true, reduced = false } = {}) {
  const classes = (...initial) => {
    const set = new Set(initial);
    return { add: value => set.add(value), remove: value => set.delete(value), contains: value => set.has(value), toggle: (value, on) => on ? set.add(value) : set.delete(value) };
  };
  const animations = [];
  const element = () => ({
    addEventListener() {}, querySelector: () => null, classList: classes(), style: { setProperty() {} }, contains: () => false,
    querySelectorAll: () => [0, 1].map(() => ({ animate(frames, options) {
      const animation = { frames, options, cancel() {} };
      animations.push(animation);
      return animation;
    } })),
  });
  const cards = [element(), element()];
  const groups = [element(), element(), element()];
  const root = { ...element(), querySelectorAll: selector => selector === '.card' ? cards : groups, addEventListener() {} };
  const html = { classList: classes(...(pending ? ['intro-pending'] : [])) };
  const intersections = [];
  const mutations = [];
  const values = {
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; this.observed = new Set(); intersections.push(this); }
      observe(target) { this.observed.add(target); }
      unobserve(target) { this.observed.delete(target); }
      disconnect() { this.observed.clear(); }
      enter(target) { this.callback([{ target, isIntersecting: true, intersectionRatio: 0.2 }]); }
    },
    MutationObserver: class {
      constructor(callback) { this.callback = callback; mutations.push(this); }
      observe() {} disconnect() {}
    },
    document: { documentElement: html, hidden: false, activeElement: null, addEventListener() {} },
    window: { matchMedia: () => ({ matches: reduced, addEventListener() {} }), addEventListener() {} },
    matchMedia: () => ({ matches: reduced, addEventListener() {} }),
  };
  for (const [key, value] of Object.entries(values)) {
    const old = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => old ? Object.defineProperty(globalThis, key, old) : delete globalThis[key]);
  }
  setupProjectMosaic(root);
  return { root, html, cards, groups, intersections, mutations, animations };
}

test('project entrances wait for the loader, then reveal only the card entering view', t => {
  const h = harness(t);
  assert.ok(h.intersections.every(observer => observer.observed.size === 0));
  assert.equal(h.animations.length, 0);
  h.html.classList.remove('intro-pending');
  h.mutations[0].callback();
  assert.ok(h.root.classList.contains('is-ready'));
  assert.equal(h.intersections[0].observed.size, 2);
  h.intersections[0].enter(h.cards[0]);
  assert.ok(h.cards[0].classList.contains('is-revealed'));
  assert.equal(h.cards[1].classList.contains('is-revealed'), false);
  assert.equal(h.animations.length, 0, 'card top entering must not consume the title entrance');
  const textObserver = h.intersections[2];
  assert.ok(textObserver.observed.has(h.groups[2]));
  textObserver.enter(h.groups[2]);
  assert.equal(h.animations.length, 2);
  assert.equal(h.animations[0].options.delay, 0);
  assert.equal(h.animations[1].options.delay, 110);
  assert.equal(textObserver.observed.has(h.groups[2]), false);
});

test('reduced motion keeps project cards and text readable without entrances', t => {
  const h = harness(t, { pending: false, reduced: true });
  assert.equal(h.root.classList.contains('is-ready'), false);
  h.intersections[2].enter(h.groups[2]);
  assert.equal(h.animations.length, 0);
});
