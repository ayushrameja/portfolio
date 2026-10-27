import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mock, test } from "node:test";
import {
  INTRO_INIT_FAILURE_MS,
  INTRO_PLAYBACK_FAILURE_MS,
  MAX_INTRO_START_DELAY_MS,
  scheduleIntro,
  startIntro,
} from "../src/scripts/intro.ts";

function classList(initial = []) {
  const values = new Set(initial);
  return {
    contains: (name) => values.has(name),
    add: (...names) => {
      for (const name of names) values.add(name);
    },
    remove: (...names) => {
      for (const name of names) values.delete(name);
    },
  };
}

function installDocument({ reduced = false, pending = true, requestedAt = null, landing = false } = {}) {
  const animations = [];
  const listeners = new Map();
  const remember = (target, type, fn) => {
    const key = `${target}:${type}`;
    const list = listeners.get(key) ?? [];
    list.push(fn);
    listeners.set(key, list);
  };
  const forget = (target, type, fn) => {
    const key = `${target}:${type}`;
    listeners.set(key, (listeners.get(key) ?? []).filter((entry) => entry !== fn));
  };
  const dispatch = (target, event) => {
    for (const fn of listeners.get(`${target}:${event.type}`) ?? []) fn(event);
  };

  const make = (name) => ({
    name,
    hidden: false,
    attributes: {},
    dataset: {},
    animate(keyframes) {
      const animation = {
        keyframes,
        target: name,
        currentTime: null,
        played: false,
        cancelled: false,
        pause() {},
        play() {
          this.played = true;
        },
        cancel() {
          this.cancelled = true;
        },
      };
      animations.push(animation);
      return animation;
    },
    setAttribute(name, value) {
      this.attributes[name] = value;
      if (name === "hidden") this.hidden = true;
    },
    removeAttribute(name) {
      delete this.attributes[name];
    },
    focus() {
      document.activeElementId = this.id ?? name;
    },
    addEventListener(type, fn) {
      remember(name, type, fn);
    },
    removeEventListener(type, fn) {
      forget(name, type, fn);
    },
  });

  const intro = make("intro");
  intro.id = "intro";
  intro.hidden = true;
  const parts = {
    ".intro-scene": make("scene"),
    ".intro-loading": make("loading"),
    ".intro-cage": make("cage"),
    ".intro-white": make("white"),
    ".intro-detail": make("detail"),
    "#intro-skip": make("skip"),
    ".intro-echo-1": make("echo-1"),
    ".intro-echo-2": make("echo-2"),
    ".intro-echo-3": make("echo-3"),
  };
  const heroCopy = make("hero-copy");
  intro.querySelector = (selector) => parts[selector] ?? null;
  intro.addEventListener = (type, fn) => remember("intro", type, fn);
  intro.removeEventListener = (type, fn) => forget("intro", type, fn);
  intro.dispatch = (event) => dispatch("intro", event);

  const content = make("content");
  content.id = "content";
  const shell = make("shell");
  shell.id = "site-shell";
  const root = {
    classList: classList(pending ? ["intro-pending"] : []),
    dataset: {},
  };
  if (requestedAt !== null) root.dataset.introRequestedAt = String(requestedAt);

  const storage = new Map();
  const document = {
    documentElement: root,
    activeElementId: null,
    getElementById(id) {
      if (landing && id === "hero-copy") return heroCopy;
      if (id === "intro") return intro;
      if (id === "content") return content;
      if (id === "site-shell") return shell;
      return null;
    },
  };

  globalThis.window = {
    innerWidth: 390,
    innerHeight: 700,
    matchMedia: () => ({
      matches: reduced,
      addEventListener() {},
      removeEventListener() {},
    }),
    get setTimeout() {
      return globalThis.setTimeout;
    },
    get clearTimeout() {
      return globalThis.clearTimeout;
    },
  };
  globalThis.document = document;
  globalThis.sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  globalThis.requestAnimationFrame = () => 1;
  globalThis.cancelAnimationFrame = () => {};

  return { animations, intro, content, shell, root, storage, parts, dispatch: (type, extra = {}) => {
    const event = { type, preventDefault() { event.defaultPrevented = true; }, defaultPrevented: false, ...extra };
    if (type === "click") dispatch("skip", event);
    else dispatch("intro", event);
  } };
}

test("failure timeout constant matches the inline head script", () => {
  const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
  assert.match(layout, new RegExp(`\\}, ${INTRO_INIT_FAILURE_MS}\\)`));
  assert.equal(layout.includes("introRequestedAt"), false);
  assert.match(layout, /if \(intro\) intro\.hidden = false/);
  assert.match(layout, /getElementById\("intro-skip"\)/);
  assert.match(layout, /event\.key === "Escape"/);
  assert.equal(INTRO_INIT_FAILURE_MS > MAX_INTRO_START_DELAY_MS, true);
  assert.equal(INTRO_PLAYBACK_FAILURE_MS > 3200, true);
});

test("delayed playback starts at frame zero", () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    for (const delay of ["1500", "4000"]) {
      const harness = installDocument({ requestedAt: -10_000 });
      let started = false;
      scheduleIntro(delay, () => {
        started = true;
        startIntro();
      });
      assert.equal(started, false);
      mock.timers.tick(Number(delay));
      assert.equal(started, true);
      assert.equal(harness.intro.hidden, false);
      assert.equal(harness.animations.length > 0, true);
      for (const animation of harness.animations) {
        assert.equal(animation.currentTime, 0);
        assert.equal(animation.played, true);
        assert.equal(animation.cancelled, false);
      }
      const loading = harness.animations[0];
      assert.equal(loading.keyframes[0].offset, 0);
      assert.equal(loading.keyframes[0].opacity, 1);
      assert.equal(loading.keyframes[2].opacity, 0);
      assert.equal(loading.keyframes[2].offset, 300 / 3200);
      const scene = harness.animations[1];
      assert.equal(scene.keyframes[0].offset, 0);
      assert.match(String(scene.keyframes[0].transform), /translate\(390px, 180px\) rotate\(28deg\) rotateY\(0deg\) scale\(10\.5\)/);
      harness.dispatch("click");
    }
  } finally {
    mock.timers.reset();
  }
});

test("normal start, skip, escape, reduced motion, and stalled playback", () => {
  const normal = installDocument({ requestedAt: performance.now() - 5000 });
  scheduleIntro(null, startIntro);
  assert.equal(normal.animations.every((animation) => animation.currentTime === 0 && animation.played), true);
  assert.equal(normal.storage.get("ar-intro-seen"), "1");
  normal.dispatch("keydown", { key: "Tab" });
  assert.equal(globalThis.document.activeElementId, "skip");
  normal.dispatch("keydown", { key: "Escape" });
  assert.equal(normal.intro.hidden, true);
  assert.equal(globalThis.document.activeElementId, "content");
  assert.equal(normal.root.classList.contains("intro-pending"), false);

  const skip = installDocument();
  startIntro();
  skip.dispatch("click");
  assert.equal(skip.intro.hidden, true);
  assert.equal(globalThis.document.activeElementId, "content");
  assert.equal(skip.shell.attributes.inert, undefined);

  const reduced = installDocument({ reduced: true });
  startIntro();
  assert.equal(reduced.animations.length, 0);
  assert.equal(reduced.storage.has("ar-intro-seen"), false);
  assert.equal(reduced.intro.hidden, true);
  assert.equal(reduced.root.classList.contains("intro-pending"), false);

  const repeat = installDocument({ pending: false });
  startIntro();
  assert.equal(repeat.animations.length, 0);
  assert.equal(repeat.storage.has("ar-intro-seen"), false);

  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const stalled = installDocument();
    startIntro();
    assert.equal(stalled.intro.hidden, false);
    mock.timers.tick(INTRO_PLAYBACK_FAILURE_MS);
    assert.equal(stalled.intro.hidden, true);
    assert.equal(stalled.root.classList.contains("intro-playing"), false);
    assert.equal(stalled.animations.every((animation) => animation.cancelled), true);
  } finally {
    mock.timers.reset();
  }
});

test("hold does not start playback", () => {
  const harness = installDocument();
  let started = false;
  scheduleIntro("hold", () => {
    started = true;
    startIntro();
  });
  assert.equal(started, false);
  assert.equal(harness.animations.length, 0);
  assert.equal(harness.storage.has("ar-intro-seen"), false);
});


test("intro cuts away without fading the overlay or animating hero content", () => {
  const harness = installDocument({ landing: true });
  let nextFrame;
  globalThis.requestAnimationFrame = (callback) => { nextFrame = callback; return 1; };
  startIntro();
  assert.equal(harness.animations.some(animation => ["intro", "hero-copy"].includes(animation.target)), false);
  harness.animations[0].currentTime = 3199;
  nextFrame();
  assert.equal(harness.intro.hidden, false);
  harness.animations[0].currentTime = 3200;
  nextFrame();
  assert.equal(harness.intro.hidden, true);
  assert.equal(harness.shell.attributes.inert, undefined);
  assert.equal(harness.animations.every(animation => animation.cancelled), true);
});
