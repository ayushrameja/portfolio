import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPageScope } from '../src/scripts/page-scope.ts';
import { preparePageSwap } from '../src/scripts/page-transition.ts';

test('repeated route visits release observers, effects, and global listeners exactly once', t => {
  const previous = globalThis.document;
  globalThis.document = new EventTarget();
  t.after(() => { globalThis.document = previous; });
  const target = new EventTarget();
  let updates = 0;
  let disconnected = 0;
  let stopped = 0;
  for (let visit = 0; visit < 4; visit++) {
    const scope = createPageScope();
    scope.observe({ disconnect() { disconnected++; } });
    scope.listen(target, 'scroll', () => updates++);
    scope.add(() => {
      stopped++;
      target.dispatchEvent(new Event('scroll')); // Listeners are already gone.
    });
    target.dispatchEvent(new Event('scroll'));
    assert.equal(updates, visit + 1);
    document.dispatchEvent(new Event('astro:before-swap'));
    scope.dispose();
    assert.equal(disconnected, visit + 1);
    assert.equal(stopped, visit + 1);
    assert.equal(updates, visit + 1);
  }
});

test('client route arrivals suppress the home intro before the document is swapped', () => {
  const classes = new Set(['home-page', 'intro-pending', 'intro-playing']);
  const root = { dataset: {}, classList: { remove: (...names) => names.forEach(name => classes.delete(name)) } };
  const attributes = { shell: new Set(['inert']), intro: new Set() };
  const controls = [{ inert: true, removeAttribute() { this.inert = false; } }];
  const dock = { dataset: { visible: 'false', expanded: 'false' }, inert: true, removeAttribute() { this.inert = false; }, querySelectorAll: () => controls };
  preparePageSwap({ newDocument: {
    documentElement: root,
    querySelector: () => dock,
    getElementById: id => id === 'site-shell'
      ? { removeAttribute: name => attributes.shell.delete(name) }
      : { setAttribute: name => attributes.intro.add(name) },
  } });
  assert.equal(root.dataset.clientNavigation, 'true');
  assert.deepEqual([...classes], ['home-page']);
  assert.equal(attributes.shell.has('inert'), false);
  assert.equal(attributes.intro.has('hidden'), true);
  assert.equal(dock.dataset.visible, 'false');
  assert.equal(dock.dataset.expanded, 'false');
  assert.equal(dock.inert, true);
  assert.equal(controls[0].inert, true);
});
