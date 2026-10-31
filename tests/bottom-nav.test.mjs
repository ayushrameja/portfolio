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

test('section previews preserve aspect ratio in desktop and phone viewports', async () => {
  const { previewScale } = await import('../src/scripts/bottom-nav.ts');
  assert.equal(previewScale(1440, 900, 370, 200), 200 / 900);
  assert.equal(previewScale(390, 844, 260, 180), 180 / 844);
  assert.equal(previewScale(1440, 900, 200, 400), 200 / 1440);
});
