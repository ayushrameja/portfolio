import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { createPageScope } from './page-scope';

/** The site's scroll. Lenis smooths the wheel, and three things ride on it:
 *
 *  - `[data-reveal]` pieces arrive as they are scrolled to. How far each one
 *    has come is tied to the scroll position, never runs backwards, and is
 *    handed to CSS as `--p` (0 to 1); the looks live in site.css.
 *  - Those pieces lean with the scroll's speed and straighten when it stops.
 *  - `[data-drift]` layers, the section patterns, move slower than the page.
 *
 *  Everything is measured up front and after resizes, so a frame only reads
 *  the scroll position and writes transforms. Whatever those transforms move
 *  is on its own compositor layer (`data-layer`), so a frame moves pictures
 *  that are already painted instead of painting cards again. Armed by the `reveal-ready`
 *  class from the layout's head: without JavaScript or with reduced motion the
 *  page scrolls natively and nothing is hidden. */

type Piece = {
  el: HTMLElement;
  words: HTMLElement[];
  top: number;
  height: number;
  /** Scroll position, measured at the viewport's foot, where it starts to arrive. */
  start: number;
  goal: number;
  shown: number;
  written: number;
  done: boolean;
  /** The piece this one sits inside, and so moves with. */
  parent: Piece | null;
  leans: boolean;
  leaning: boolean;
  /** On its own compositor layer. */
  lifted: boolean;
};
type Drift = { el: HTMLElement; top: number; height: number; y: number };

const LEAN_PER_SPEED = .06;
const LEAN_LIMIT = 3;
const DRIFT_RATE = .12;
const DRIFT_LIMIT = 140;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const pageTop = (el: HTMLElement) => {
  let y = 0;
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) y += node.offsetTop;
  return y;
};

/** Wraps each word of a heading so the words can rise one after another. An
 *  element inside the heading moves as one piece. The heading keeps its text
 *  as its accessible name. */
function splitWords(heading: HTMLElement) {
  const words: HTMLElement[] = [];
  heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
  const holder = document.createElement('span');
  holder.setAttribute('aria-hidden', 'true');
  for (const node of Array.from(heading.childNodes)) {
    if (node instanceof HTMLElement && node.tagName !== 'BR') { node.classList.add('reveal-word'); words.push(node); holder.append(node); continue; }
    if (node.nodeType !== Node.TEXT_NODE) { holder.append(node); continue; }
    for (const part of (node.textContent ?? '').split(/(\s+)/)) {
      if (!part.trim()) { if (part) holder.append(' '); continue; }
      const word = document.createElement('span');
      word.className = 'reveal-word';
      word.textContent = part;
      words.push(word);
      holder.append(word);
    }
  }
  heading.replaceChildren(holder);
  heading.classList.add('is-split');
  return words;
}

export function setupScrollStory() {
  const root = document.documentElement;
  if (!root.classList.contains('reveal-ready')) return;
  const scope = createPageScope();
  // Nested scrollers (the message box, a long outline) keep the wheel while
  // they have somewhere to go, then hand it back to the page.
  const lenis = new Lenis({ anchors: true, allowNestedScroll: true });
  scope.add(() => lenis.destroy());

  // The loader holds the page still; the wheel must not queue up behind it.
  if (root.dataset.intro) {
    lenis.stop();
    const intro = scope.observe(new MutationObserver(() => {
      if (root.dataset.intro) return;
      intro.disconnect();
      lenis.start();
    }));
    intro.observe(root, { attributes: true, attributeFilter: ['data-intro'] });
  }

  // Leaning and drifting follow the wheel. A finger scrolls on the compositor,
  // ahead of any script, so on touch they would only trail behind it.
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pieces: Piece[] = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).map(el => ({
    el,
    words: el.dataset.reveal === 'words' ? splitWords(el) : [],
    top: 0, height: 0, start: 0, goal: 0, shown: 0, written: -1, done: false,
    parent: null,
    leans: false,
    leaning: false,
    lifted: false,
  }));
  for (const piece of pieces) {
    const outer = piece.el.parentElement?.closest('[data-reveal]');
    if (outer) piece.parent = pieces.find(other => other.el === outer) ?? null;
  }
  const drifts: Drift[] = fine ? Array.from(document.querySelectorAll<HTMLElement>('[data-drift]')).map(el => ({ el, top: 0, height: 0, y: 0 })) : [];
  root.setAttribute('data-reveal-live', '');

  let viewport = 0, range = 0;
  const measure = () => {
    viewport = window.innerHeight;
    range = clamp(viewport * .3, 180, 320);
    const last = root.scrollHeight - range - 8;
    let rowTop = -Infinity, column = 0;
    for (const piece of pieces) {
      piece.top = pageTop(piece.el);
      piece.height = piece.el.offsetHeight;
      // Anything taller than the viewport, such as an essay, stays upright.
      piece.leans = fine && !piece.parent && piece.height < viewport * 1.1;
      lift(piece);
      // A shape inside a card follows just behind its card.
      if (piece.parent) { piece.start = Math.min(piece.parent.start + 48, last); continue; }
      // Pieces that share a row arrive left to right.
      column = Math.abs(piece.top - rowTop) < 12 ? column + 1 : 0;
      if (!column) rowTop = piece.top;
      piece.start = Math.min(piece.top + Math.min(column, 4) * 56, last);
    }
    for (const drift of drifts) { drift.top = pageTop(drift.el); drift.height = drift.el.offsetHeight; }
    dirty = true;
  };

  // A piece keeps its layer for as long as something may still move it: until
  // it has arrived, and for good if it leans.
  const lift = (piece: Piece) => {
    const lifted = piece.leans || !piece.done;
    if (lifted === piece.lifted) return;
    piece.lifted = lifted;
    piece.el.toggleAttribute('data-layer', lifted);
  };
  const write = (piece: Piece, value: number) => {
    const count = piece.words.length;
    if (!count) { piece.el.style.setProperty('--p', value.toFixed(3)); return; }
    piece.words.forEach((word, index) => word.style.setProperty('--p', clamp((value * (count + 2) - index) / 3, 0, 1).toFixed(3)));
  };
  const finish = (piece: Piece) => {
    piece.done = true;
    piece.shown = 1;
    piece.el.classList.add('is-revealed');
    piece.el.style.removeProperty('--p');
    piece.words.forEach(word => word.style.removeProperty('--p'));
    lift(piece);
  };

  let dirty = true, lean = 0, lastScroll = lenis.scroll, lastTime = 0;
  const frame = (time: number) => {
    request = requestAnimationFrame(frame);
    const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
    lastTime = time;
    lenis.raf(time);
    const scroll = lenis.scroll;
    const speed = (scroll - lastScroll) / elapsed * 16.7;
    lastScroll = scroll;
    const target = fine ? clamp(speed * LEAN_PER_SPEED, -LEAN_LIMIT, LEAN_LIMIT) : 0;
    lean += (target - lean) * (1 - Math.exp(-elapsed / 90));
    if (lean && Math.abs(lean) < .01 && !target) { lean = 0; dirty = true; }
    if (!speed && !lean && !dirty) return;
    dirty = false;

    const foot = scroll + viewport;
    const ease = 1 - Math.exp(-elapsed / 120);
    const skew = lean ? `skewY(${lean.toFixed(2)}deg)` : '';
    // A piece waits until the one before it is on its way, so a jump or a
    // fresh load still plays out as a sequence instead of all at once.
    let clear = true;
    for (const piece of pieces) {
      const inView = piece.top < foot + 80 && piece.top + piece.height > scroll - 80;
      if (piece.leaning || (piece.leans && inView)) {
        const next = piece.leans && inView ? skew : '';
        if (piece.el.style.transform !== next) piece.el.style.transform = next;
        piece.leaning = Boolean(next);
      }
      if (piece.done) continue;
      if (piece.top + piece.height < scroll - 40) { finish(piece); continue; }
      piece.goal = Math.max(piece.goal, clamp((foot - piece.start) / range, 0, 1));
      // Past halfway a piece is committed, so stopping never leaves one half arrived.
      if (piece.goal > .5) piece.goal = 1;
      if (!piece.goal) continue;
      if (clear) piece.shown += (piece.goal - piece.shown) * ease;
      clear = piece.shown > Math.min(.3, piece.goal * .6);
      if (piece.shown > .996) { finish(piece); continue; }
      if (piece.goal - piece.shown > .002) dirty = true;
      // Arrivals start quickly and settle softly.
      const value = 1 - (1 - piece.shown) ** 2;
      if (Math.abs(value - piece.written) < .002) continue;
      piece.written = value;
      write(piece, value);
    }
    for (const drift of drifts) {
      if (drift.top > foot || drift.top + drift.height < scroll) continue;
      const y = Math.round(clamp((scroll - drift.top) * DRIFT_RATE, -DRIFT_LIMIT, DRIFT_LIMIT));
      if (y === drift.y) continue;
      drift.y = y;
      drift.el.style.transform = `translate3d(0,${y}px,0)`;
    }
  };

  measure();
  // Images, fonts and folding outlines all change where things sit.
  scope.observe(new ResizeObserver(measure)).observe(document.body);
  scope.listen(window, 'resize', measure);
  let request = requestAnimationFrame(frame);
  scope.add(() => cancelAnimationFrame(request));
}
