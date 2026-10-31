import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createScrollLifecycle } from '../src/scripts/home-scroll.ts';

test('scroll stays native through loading and reduced motion, with one smooth instance after reveal', () => {
  const instances = [];
  const lifecycle = createScrollLifecycle(() => {
    const instance = { destroyed: 0, destroy() { this.destroyed++; } };
    instances.push(instance);
    return instance;
  });
  const ready = { introPending: false, reduced: false, hidden: false };
  lifecycle.update({ ...ready, introPending: true });
  lifecycle.update({ ...ready, reduced: true });
  assert.equal(instances.length, 0);
  lifecycle.update(ready);
  lifecycle.update(ready); // Lenis itself changes root classes.
  assert.equal(instances.length, 1);
  lifecycle.update({ ...ready, reduced: true });
  lifecycle.update({ ...ready, reduced: true });
  assert.equal(instances[0].destroyed, 1);
  lifecycle.update(ready);
  assert.equal(instances.length, 2);
  lifecycle.update({ ...ready, hidden: true });
  assert.equal(instances[1].destroyed, 1);
  lifecycle.update(ready); // Background tab / bfcache return.
  assert.equal(instances.length, 3);
});
