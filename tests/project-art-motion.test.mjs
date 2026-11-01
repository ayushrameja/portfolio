import assert from 'node:assert/strict';
import { test } from 'node:test';
import { setupProjectArtMotion } from '../src/scripts/project-art-motion.ts';

function harness(t, { reduced = false, selectors = ['.shot img'] } = {}) {
  const events = () => ({ listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; }, emit(name) { this.listeners[name]?.(); } });
  const motion = { ...events(), matches: reduced };
  const toggle = { ...events(), hidden: true, textContent: '', attributes: {}, setAttribute(k, v) { this.attributes[k] = v; } };
  const animations = [];
  const cards = [0, 1].map(() => {
    const card = { querySelector() { return this.art; },
      querySelectorAll: selector => selectors.includes(selector) ? [{ animate(frames, options) {
        const animation = { frames, options, currentTime: 0, playState: 'running',
          cancel() { this.playState = 'idle'; }, pause() { this.playState = 'paused'; }, play() { this.playState = 'running'; } };
        animations.push(animation); return animation;
      } }] : [],
    };
    card.art = { closest: () => card };
    return card;
  });
  let observer;
  const document = { ...events(), hidden: false };
  const window = { ...events(), matchMedia: () => motion };
  const globals = { document, window, IntersectionObserver: class {
    constructor(callback) { observer = this; this.callback = callback; }
    observe() {}
    entries(...items) { this.callback(items.map(([i, ratio]) => ({ target: cards[i].art, intersectionRatio: ratio, isIntersecting: ratio > 0 }))); }
  } };
  for (const [key, value] of Object.entries(globals)) {
    const old = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => old ? Object.defineProperty(globalThis, key, old) : delete globalThis[key]);
  }
  setupProjectArtMotion({ querySelectorAll: () => cards, querySelector: () => toggle });
  return { animations, observer, motion, document, window, toggle };
}

test('visible cards loop slowly, pause offscreen, and resume the same animation', t => {
  const h = harness(t);
  assert.equal(h.animations.length, 0);
  h.observer.entries([0, .1], [1, .8]);
  assert.equal(h.animations.length, 2);
  assert.ok(h.animations.every(a => a.options.iterations === Infinity && a.options.duration >= 10000));
  h.animations[0].currentTime = 3000;
  h.observer.entries([0, 0]); assert.equal(h.animations[0].playState, 'paused');
  assert.equal(h.animations[1].playState, 'running');
  h.observer.entries([0, .8]);
  assert.equal(h.animations.length, 2);
  assert.equal(h.animations[0].currentTime, 3000);
  assert.equal(h.animations[0].playState, 'running');
});

test('visitor pause survives scrolling, hidden tabs and page restoration', t => {
  const h = harness(t);
  h.observer.entries([0, 1]); h.toggle.emit('click');
  assert.equal(h.animations[0].playState, 'paused');
  assert.equal(h.toggle.attributes['aria-pressed'], 'true');
  assert.equal(h.toggle.attributes['aria-label'], 'Resume artwork');
  assert.equal(h.toggle.attributes.title, 'Resume artwork');
  h.observer.entries([1, 1]); assert.equal(h.animations.length, 1);
  h.document.hidden = true; h.document.emit('visibilitychange');
  h.document.hidden = false; h.document.emit('visibilitychange');
  h.window.emit('pagehide'); h.window.emit('pageshow');
  assert.equal(h.animations[0].playState, 'paused');
  h.toggle.emit('click');
  assert.equal(h.animations.length, 2);
  assert.ok(h.animations.every(a => a.playState === 'running'));
});

test('backgrounding and page departure pause loops without consuming them', t => {
  const h = harness(t); h.observer.entries([0, 1]);
  h.document.hidden = true; h.document.emit('visibilitychange');
  assert.equal(h.animations[0].playState, 'paused');
  h.document.hidden = false; h.document.emit('visibilitychange');
  assert.equal(h.animations[0].playState, 'running');
  h.window.emit('pagehide'); assert.equal(h.animations[0].playState, 'paused');
  h.window.emit('pageshow'); assert.equal(h.animations[0].playState, 'running');
});

test('reduced motion stays static and cancels loops immediately when enabled', t => {
  const h = harness(t, { reduced: true }); h.observer.entries([0, 1]);
  assert.equal(h.animations.length, 0); assert.equal(h.toggle.hidden, true);
  h.motion.matches = false; h.motion.emit('change');
  assert.equal(h.animations.length, 1); assert.equal(h.toggle.hidden, false);
  h.motion.matches = true; h.motion.emit('change');
  assert.equal(h.animations[0].playState, 'idle');
  h.motion.matches = false; h.motion.emit('change');
  assert.equal(h.animations.length, 2); assert.equal(h.animations[1].playState, 'running');
});


test('diagram motion obeys pause, offscreen and reduced-motion controls', t => {
  const h = harness(t, { selectors: ['.journey-stop > svg', '.service-core > svg', '.journey-dashes', '.service-packet'] });
  h.observer.entries([0, 1]);
  assert.equal(h.animations.length, 4);
  assert.deepEqual(h.animations[2].frames, [{ strokeDashoffset: '0' }, { strokeDashoffset: '-40' }]);
  assert.ok(h.animations.every(a => a.playState === 'running'));
  h.toggle.emit('click');
  assert.ok(h.animations.every(a => a.playState === 'paused'));
  h.observer.entries([0, 0]); h.observer.entries([0, 1]);
  assert.ok(h.animations.every(a => a.playState === 'paused'));
  h.toggle.emit('click');
  assert.ok(h.animations.every(a => a.playState === 'running'));
  h.motion.matches = true; h.motion.emit('change');
  assert.ok(h.animations.every(a => a.playState === 'idle'));
  assert.equal(h.toggle.hidden, true);
});
