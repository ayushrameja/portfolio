import assert from 'node:assert/strict';
import { test } from 'node:test';
import { currentSection } from '../src/scripts/bottom-nav.ts';

test('section label follows the reading position in either scroll direction', () => {
  const positions = offset => [
    { id: 'home', label: 'Introduction', top: -offset },
    { id: 'selected-work', label: 'Selected work', top: 900 - offset },
    { id: 'notes', label: 'Notes', top: 1900 - offset },
  ];
  for (const [offset, expected] of [[0, 'home'], [900, 'selected-work'], [1800, 'notes'], [700, 'selected-work'], [100, 'home']]) {
    assert.equal(currentSection(positions(offset), 280)?.id, expected);
  }
});

test('section tracking tolerates empty pages and space before the first section', () => {
  assert.equal(currentSection([], 200), undefined);
  assert.equal(currentSection([{ id: 'home', label: 'Introduction', top: 300 }], 200)?.id, 'home');
});

test('preview selection follows the closest card without wrapping at either end', async () => {
  const { nearestPreview } = await import('../src/scripts/bottom-nav.ts');
  assert.equal(nearestPreview([200, 600], 200), 0);
  assert.equal(nearestPreview([200, 600], 580), 1);
  assert.equal(nearestPreview([200, 600], -100), 0);
  assert.equal(nearestPreview([200, 600], 1000), 1);
});

test('dock stays visible past 20vh across section boundaries and scroll directions', async () => {
  const { dockVisible } = await import('../src/scripts/bottom-nav.ts');
  for (const viewport of [600, 900]) {
    const state = { viewport, menuOpen: false };
    assert.equal(dockVisible({ ...state, progress: viewport * .2 - 1 }), false);
    for (const progress of [viewport * .2, 700, 1800, 2400, 700]) {
      assert.equal(dockVisible({ ...state, progress }), true);
    }
    assert.equal(dockVisible({ ...state, progress: 0 }), false);
    assert.equal(dockVisible({ ...state, progress: 0, menuOpen: true }), true);
  }
});

test('trackpad gestures stay native, while vertical wheel ticks translate without snap recoil', async () => {
  const { setupBottomNav } = await import('../src/scripts/bottom-nav.ts');
  const { mock } = await import('node:test');
  const originals = Object.fromEntries(['window', 'document', 'matchMedia', 'ResizeObserver', 'requestAnimationFrame', 'cancelAnimationFrame'].map(key => [key, globalThis[key]]));
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    const node = () => ({
      dataset: {}, style: { removeProperty() { delete this.scrollSnapType; } },
      handlers: {}, addEventListener(type, fn) { this.handlers[type] = fn; },
      setAttribute() {}, contains() { return false; }, querySelector(_selector) { return null; }, querySelectorAll() { return []; },
    });
    const track = node(), trigger = node(), menu = node(), label = node(), resume = node();
    const nav = node(), hero = node();
    menu.hidden = true;
    track.clientWidth = 400;
    const moves = [];
    track.scrollBy = options => moves.push(options.left);
    nav.querySelector = selector => ({ '.dock-trigger': trigger, '.dock-panel': menu, '.dock-label': label, '.dock-track': track, '.dock-resume': resume, '.dock-count': node() })[selector];
    globalThis.document = {
      querySelector: selector => selector === '.bottom-nav' ? nav : hero,
      querySelectorAll: () => [], addEventListener() {}, activeElement: null,
    };
    globalThis.window = { scrollY: 0, innerHeight: 800, addEventListener() {}, setTimeout: globalThis.setTimeout };
    globalThis.matchMedia = () => ({ matches: false });
    globalThis.ResizeObserver = class { observe() {} };
    globalThis.requestAnimationFrame = () => 1;
    globalThis.cancelAnimationFrame = () => {};
    setupBottomNav();
    const wheel = (x, y, ctrlKey = false) => {
      const event = { deltaX: x, deltaY: y, deltaMode: 0, ctrlKey, prevented: false, preventDefault() { this.prevented = true; } };
      track.handlers.wheel(event);
      return event;
    };
    assert.equal(wheel(60, 2).prevented, false);
    assert.equal(wheel(1, 4).prevented, false, 'diagonal tail remains native');
    assert.deepEqual(moves, []);
    mock.timers.tick(180);
    assert.equal(wheel(0, 45).prevented, true);
    assert.equal(track.style.scrollSnapType, 'none');
    assert.deepEqual(moves, [45]);
    assert.equal(wheel(0, 20, true).prevented, false, 'pinch zoom remains native');
    mock.timers.tick(180);
    assert.equal(track.style.scrollSnapType, undefined);
  } finally {
    mock.timers.reset();
    Object.assign(globalThis, originals);
  }
});

function dockHarness() {
  const keys = ['window', 'document', 'Node', 'matchMedia', 'ResizeObserver', 'requestAnimationFrame', 'cancelAnimationFrame'];
  const originals = Object.fromEntries(keys.map(key => [key, globalThis[key]]));
  const frames = new Map();
  let frameId = 0;
  class Node {
    dataset = {};
    handlers = {};
    attrs = {};
    children = [];
    style = { removeProperty() {} };
    addEventListener(type, fn) { (this.handlers[type] ??= []).push(fn); }
    emit(type, event = {}) { this.handlers[type]?.forEach(fn => fn(event)); }
    setAttribute(key, value) { this.attrs[key] = value; }
    removeAttribute(key) { delete this.attrs[key]; }
    contains(target) { return target === this || this.children.some(child => child.contains(target)); }
    querySelector() { return null; }
    querySelectorAll() { return []; }
    focus(options) { document.activeElement = this; this.lastFocusOptions = options; }
    getBoundingClientRect() { return { left: 0, top: -window.scrollY, width: 400 }; }
    scrollTo() {}
    scrollBy() {}
  }
  const nav = new Node(), hero = new Node(), trigger = new Node(), menu = new Node();
  const label = new Node(), track = new Node(), resume = new Node(), count = new Node();
  nav.children = [trigger, menu, resume];
  menu.children = [track];
  menu.hidden = true;
  hero.dataset = { navSection: 'Introduction' };
  hero.id = 'home';
  track.clientWidth = 400;
  nav.querySelector = selector => ({ '.dock-trigger': trigger, '.dock-panel': menu, '.dock-label': label, '.dock-track': track, '.dock-resume': resume, '.dock-count': count })[selector];
  const doc = new Node();
  doc.querySelector = selector => selector === '.bottom-nav' ? nav : hero;
  doc.querySelectorAll = () => [hero];
  doc.activeElement = null;
  const win = Object.assign(new Node(), { scrollY: 0, innerHeight: 800, setTimeout });
  Object.assign(globalThis, {
    document: doc, window: win, Node,
    matchMedia: () => ({ matches: false }),
    ResizeObserver: class { observe() {} },
    requestAnimationFrame: fn => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const flush = () => {
    let rounds = 0;
    while (frames.size) {
      assert.ok(++rounds < 20, 'animation frames settle');
      const batch = [...frames.values()]; frames.clear(); batch.forEach(fn => fn());
    }
  };
  return {
    nav, hero, trigger, menu, track, label, doc, flush,
    scroll(y) { win.scrollY = y; win.emit('scroll'); flush(); },
    restore() { Object.assign(globalThis, originals); },
  };
}

test('closing the section picker then scrolling home does not pin the dock through retained focus or hover', async () => {
  const { setupBottomNav } = await import('../src/scripts/bottom-nav.ts');
  const h = dockHarness();
  try {
    setupBottomNav();
    h.scroll(1200);
    assert.equal(h.nav.dataset.visible, 'true');
    h.trigger.focus();
    h.nav.emit('pointerenter', { pointerType: 'mouse' });
    h.trigger.emit('click'); h.flush();
    h.track.emit('scroll');
    h.trigger.emit('click'); h.flush();
    assert.equal(h.menu.hidden, true);
    h.scroll(0);
    assert.equal(h.nav.dataset.visible, 'false');
    assert.equal(h.nav.inert, true);
    assert.equal(h.trigger.inert, true);
    assert.equal(h.nav.dataset.expanded, 'false');
    assert.equal(h.doc.activeElement, h.hero, 'move focus out before making the dock inert');
    assert.deepEqual(h.hero.lastFocusOptions, { preventScroll: true });
    h.scroll(400);
    assert.equal(h.nav.dataset.visible, 'true', 'dock can return on the next scroll');
    assert.equal(h.trigger.inert, false);
  } finally { h.restore(); }
});

test('an open picker stays available at the top, then Escape hides it without another scroll', async () => {
  const { setupBottomNav } = await import('../src/scripts/bottom-nav.ts');
  const h = dockHarness();
  try {
    setupBottomNav(); h.scroll(1200);
    h.trigger.focus(); h.trigger.emit('click'); h.flush();
    h.scroll(0);
    assert.equal(h.nav.dataset.visible, 'true');
    h.doc.emit('keydown', { key: 'Escape', preventDefault() {} }); h.flush();
    assert.equal(h.menu.hidden, true);
    assert.equal(h.nav.dataset.visible, 'false');
    assert.equal(h.doc.activeElement, h.hero);
  } finally { h.restore(); }
});

test('hiding the dock never takes focus from elsewhere on the page', async () => {
  const { setupBottomNav } = await import('../src/scripts/bottom-nav.ts');
  const h = dockHarness();
  try {
    setupBottomNav(); h.scroll(1200);
    const outside = {};
    h.doc.activeElement = outside;
    h.scroll(0);
    assert.equal(h.nav.dataset.visible, 'false');
    assert.equal(h.doc.activeElement, outside);
  } finally { h.restore(); }
});

test('a compact contact section becomes active at the page end before it reaches the usual reading line', async () => {
  const { setupBottomNav } = await import('../src/scripts/bottom-nav.ts');
  const h = dockHarness();
  try {
    const contact = { id: 'contact', dataset: { navSection: 'Contact' }, getBoundingClientRect: () => ({ top: 1850 - window.scrollY }) };
    h.doc.querySelectorAll = () => [h.hero, contact];
    Object.assign(h.doc, { documentElement: { scrollHeight: 2200 } });
    setupBottomNav();
    h.scroll(1000);
    assert.equal(h.label.textContent, 'Introduction');
    h.scroll(1400);
    assert.equal(h.label.textContent, 'Contact');
    h.scroll(0);
    assert.equal(h.label.textContent, 'Introduction');
    assert.equal(h.nav.dataset.visible, 'false');
  } finally { h.restore(); }
});
