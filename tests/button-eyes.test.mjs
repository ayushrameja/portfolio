import assert from 'node:assert/strict';
import { test } from 'node:test';
import { eyePosition, setupButtonEyes } from '../src/scripts/button-eyes.ts';

function harness(t) {
  const timers = new Map();
  let now = 0;
  let nextTimer = 0;
  const events = () => {
    const listeners = new Map();
    return {
      addEventListener(type, callback) { listeners.set(type, [...listeners.get(type) ?? [], callback]); },
      emit(type, event = {}) { listeners.get(type)?.forEach(callback => callback(event)); },
    };
  };
  const classes = new Set(['intro-pending']);
  const classList = set => ({ add: (...values) => values.forEach(v => set.add(v)), remove: (...values) => values.forEach(v => set.delete(v)), contains: v => set.has(v), toggle: (v, on) => on ? set.add(v) : set.delete(v) });
  const active = new Set();
  const props = new Map();
  const animations = [];
  const button = { ...events(), clientWidth: 216, classList: classList(active), matches: () => true,
    style: { setProperty: (key, value) => props.set(key, value) },
    querySelectorAll: () => [0, 1].map(() => ({ animate() { const a = { cancelled: false, cancel() { a.cancelled = true; } }; animations.push(a); return a; } })),
    querySelector: () => ({ getBoundingClientRect: () => ({ left: 100, top: 50, width: 32, height: 13 }) }),
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 216, height: 52 }),
  };
  const reduced = { ...events(), matches: false };
  const doc = { ...events(), hidden: false, documentElement: { classList: classList(classes) } };
  const win = { ...events(), setTimeout(fn, delay) { const id = ++nextTimer; timers.set(id, { fn, at: now + delay }); return id; } };
  let intersect;
  let mutate;
  const globals = { document: doc, window: win, matchMedia: () => reduced,
    clearTimeout: id => timers.delete(id),
    IntersectionObserver: class { constructor(callback) { intersect = callback; } observe() {} },
    MutationObserver: class { constructor(callback) { mutate = callback; } observe() {} },
  };
  for (const [key, value] of Object.entries(globals)) {
    const old = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => old ? Object.defineProperty(globalThis, key, old) : delete globalThis[key]);
  }
  const advance = ms => {
    const end = now + ms;
    for (;;) {
      const due = [...timers].filter(([, value]) => value.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!due) break;
      now = due[1].at; timers.delete(due[0]); due[1].fn();
    }
    now = end;
  };
  setupButtonEyes(button);
  return { button, timers, active, props, reduced, doc, win, animations, advance,
    next: () => advance(Math.min(...[...timers.values()].map(timer => timer.at)) - now),
    enter: () => intersect([{ isIntersecting: true }]), leave: () => intersect([{ isIntersecting: false }]),
    ready: () => { classes.delete('intro-pending'); mutate(); },
  };
}

test('eye positions stay inside narrow and wide buttons, including out-of-bounds pointer input', () => {
  for (const width of [60, 216, 248, 400]) {
    for (const fraction of [-3, 0, .5, 1, 4]) assert.ok(Math.abs(eyePosition(width, fraction)) <= Math.max(0, width - 76) / 2);
  }
  assert.equal(eyePosition(216, .5), 0);
  assert.notEqual(eyePosition(216, .1), eyePosition(216, .9));
});

test('initial peek waits for the intro, hides, and schedules another visit without hovering', t => {
  const h = harness(t);
  h.enter(); h.advance(10000);
  assert.equal(h.active.has('eyes-active'), false);
  assert.equal(h.timers.size, 0);
  h.ready(); h.advance(450);
  assert.ok(h.active.has('eyes-active'));
  h.advance(4200);
  assert.equal(h.active.has('eyes-active'), false);
  assert.equal(h.timers.size, 1, 'only the next visit is scheduled while idle');
  h.next();
  assert.ok(h.active.has('eyes-active'), 'the next idle visit appears without pointer input');
  assert.ok(h.props.has('--eye-drift-x'));
});

test('eyes sleep offscreen, in hidden tabs, during reduced motion, and across pagehide', t => {
  const h = harness(t);
  h.ready(); h.enter(); h.advance(1500);
  assert.ok(h.active.has('eyes-active'));
  h.leave();
  assert.equal(h.timers.size, 0);
  assert.ok(h.animations.every(a => a.cancelled));
  h.enter(); h.advance(11000);
  h.doc.hidden = true; h.doc.emit('visibilitychange');
  assert.equal(h.timers.size, 0);
  h.doc.hidden = false; h.doc.emit('visibilitychange');
  assert.equal(h.timers.size, 1);
  h.reduced.matches = true; h.reduced.emit('change');
  assert.equal(h.timers.size, 0);
  h.reduced.matches = false; h.reduced.emit('change');
  h.win.emit('pagehide');
  assert.equal(h.timers.size, 0);
  h.win.emit('pageshow');
  assert.equal(h.timers.size, 1);
});

test('pointer interaction keeps eyes visible, tracks position, and releases on leave', t => {
  const h = harness(t);
  h.ready(); h.enter();
  h.button.emit('pointerenter', { pointerType: 'mouse' });
  h.advance(15000);
  assert.ok(h.active.has('eyes-active'));
  h.button.emit('pointermove', { pointerType: 'mouse', clientX: 200, clientY: 10 });
  assert.equal(h.props.get('--eye-look-x'), '2px');
  h.button.emit('pointerleave');
  assert.equal(h.active.has('eyes-active'), false);
  assert.equal(h.timers.size, 1);
});
