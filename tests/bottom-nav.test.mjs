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
    const state = { viewport, engaged: false };
    assert.equal(dockVisible({ ...state, progress: viewport * .2 - 1 }), false);
    for (const progress of [viewport * .2, 700, 1800, 2400, 700]) {
      assert.equal(dockVisible({ ...state, progress }), true);
    }
    assert.equal(dockVisible({ ...state, progress: 0 }), false);
    assert.equal(dockVisible({ ...state, progress: 0, engaged: true }), true);
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
