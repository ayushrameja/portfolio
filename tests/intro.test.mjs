import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { mock, test } from "node:test";
import {
  INTRO_DURATION_MS,
  INTRO_READY_HOLD_MS,
  INTRO_INIT_FAILURE_MS,
  PAGE_READY_FAILURE_MS,
  waitForPageReady,
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
    animate(keyframes, options) {
      const animation = {
        keyframes,
        options,
        target: name,
        currentTime: null,
        played: false,
        cancelled: false,
        pause() { this.played = false; },
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
    ".intro-logo": make("logo"),
    ".intro-backdrop": make("backdrop"),
    ".intro-scene": make("scene"),
    ".intro-loading": make("loading"),
    ".intro-cage": make("cage"),
    ".intro-white": make("white"),
    ".intro-detail": make("detail"),
    ".intro-echo-1": make("echo-1"),
    ".intro-echo-2": make("echo-2"),
    ".intro-echo-3": make("echo-3"),
  };
  const heroCopy = make("hero-copy");
  const hero = make("hero");
  hero.querySelector = selector => make(selector);
  intro.querySelectorAll = () => Array.from({length:8}, (_, i) => make(`tile-${i}`));
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
    readyState: "complete",
    images: [],
    fonts: { ready: Promise.resolve() },
    hidden: false,
    activeElementId: null,
    querySelector: selector => selector === ".hero" ? hero : null,
    getElementById(id) {
      if (landing && id === "hero-copy") return heroCopy;
      if (id === "intro") return intro;
      if (id === "content") return content;
      if (id === "site-shell") return shell;
      return null;
    },
  };

  const motion = {
    matches: reduced,
    addEventListener: (type, fn) => remember("motion", type, fn),
    removeEventListener: (type, fn) => forget("motion", type, fn),
  };
  globalThis.window = {
    innerWidth: 390,
    innerHeight: 700,
    matchMedia: () => motion,
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

  return { animations, intro, content, shell, root, storage, parts, reduceMotion: () => { motion.matches = true; dispatch("motion", { type: "change" }); }, dispatch: (type, extra = {}) => {
    const event = { type, preventDefault() { event.defaultPrevented = true; }, defaultPrevented: false, ...extra };
    dispatch("intro", event);
  } };
}

test("failure timeout constant matches the inline head script", () => {
  const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
  assert.match(layout, new RegExp(`\\}, ${INTRO_INIT_FAILURE_MS}\\)`));
  assert.equal(layout.includes("introRequestedAt"), false);
  assert.match(layout, /if \(intro\) intro\.hidden = false/);
  assert.equal(layout.includes("intro-skip"), false);
  assert.equal(layout.includes("Escape"), false);
  assert.equal(INTRO_INIT_FAILURE_MS > MAX_INTRO_START_DELAY_MS, true);
  assert.equal(INTRO_PLAYBACK_FAILURE_MS > INTRO_DURATION_MS, true);
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
      assert.equal(harness.animations.length, 11);
      const tile = harness.animations[0];
      assert.equal(tile.keyframes[0].offset, 0);
      assert.equal(tile.keyframes[0].opacity, 1);
      assert.equal(tile.keyframes.at(-1).offset, 1);
      assert.equal(tile.keyframes.at(-1).opacity, 0);
      assert.equal(tile.options.duration, 4000);
      harness.reduceMotion();
    }
  } finally {
    mock.timers.reset();
  }
});

test("Escape cannot skip playback; reduced motion and stall recovery still work", () => {
  const normal = installDocument({ requestedAt: performance.now() - 5000 });
  scheduleIntro(null, startIntro);
  assert.equal(normal.animations.every((animation) => animation.currentTime === 0 && animation.played), true);
  assert.equal(normal.storage.has("ar-intro-seen"), false);
  normal.dispatch("keydown", { key: "Tab" });
  assert.equal(globalThis.document.activeElementId, "intro");
  normal.dispatch("keydown", { key: "Escape" });
  assert.equal(normal.intro.hidden, false);
  assert.equal(normal.animations.some(animation => animation.cancelled), false);
  normal.reduceMotion();
  assert.equal(normal.intro.hidden, true);
  assert.equal(globalThis.document.activeElementId, "content");
  assert.equal(normal.root.classList.contains("intro-pending"), false);

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


test("intro cuts away only after the full storyboard and page readiness", async () => {
  const harness = installDocument({ landing: true });
  let nextFrame;
  globalThis.requestAnimationFrame = (callback) => { nextFrame = callback; return 1; };
  startIntro(Promise.resolve());
  await Promise.resolve();
  assert.equal(harness.animations.some(animation => ["intro", "hero-copy"].includes(animation.target)), false);
  harness.animations[0].currentTime = INTRO_DURATION_MS - 1;
  nextFrame();
  assert.equal(harness.intro.hidden, false);
  harness.animations[0].currentTime = INTRO_DURATION_MS;
  nextFrame();
  assert.equal(harness.intro.hidden, true);
  assert.equal(harness.shell.attributes.inert, undefined);
  assert.equal(harness.animations.every(animation => animation.cancelled), true);
});

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

test("slow assets hold the visible logo before revealing the hero", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const page = deferred();
    const harness = installDocument();
    let nextFrame;
    globalThis.requestAnimationFrame = callback => { nextFrame = callback; return 1; };
    startIntro(page.promise);
    harness.animations.forEach(animation => { animation.currentTime = INTRO_DURATION_MS; });
    nextFrame();
    mock.timers.tick(INTRO_PLAYBACK_FAILURE_MS + 1000);
    assert.equal(harness.intro.hidden, false);
    assert.equal(harness.intro.attributes["data-waiting"], "");
    assert.equal(harness.animations.some(animation => animation.cancelled), false);
    assert.equal(harness.animations.every(animation => animation.currentTime === INTRO_READY_HOLD_MS && !animation.played), true);
    page.resolve();
    await Promise.resolve();
    assert.equal(harness.intro.hidden, false);
    assert.equal(harness.animations.every(animation => animation.played), true);
    harness.animations.forEach(animation => { animation.currentTime = INTRO_DURATION_MS; });
    nextFrame();
    assert.equal(harness.intro.hidden, true);
  } finally { mock.timers.reset(); }
});

test("readiness timeout cannot cut a healthy unfinished storyboard", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const harness = installDocument();
    document.hidden = true;
    let nextFrame;
    globalThis.requestAnimationFrame = callback => { nextFrame = callback; return 1; };
    startIntro(new Promise(() => {}));
    harness.animations[0].currentTime = 1500;
    mock.timers.tick(PAGE_READY_FAILURE_MS);
    assert.equal(harness.intro.hidden, false);
    harness.animations[0].currentTime = INTRO_DURATION_MS;
    nextFrame();
    assert.equal(harness.intro.hidden, true);
  } finally { mock.timers.reset(); }
});

test("late readiness does not reopen a loader dismissed by reduced motion", async () => {
  const page = deferred();
  const harness = installDocument();
  startIntro(page.promise);
  harness.reduceMotion();
  page.resolve();
  await Promise.resolve();
  assert.equal(harness.intro.hidden, true);
  assert.equal(harness.root.classList.contains("intro-pending"), false);
});

test("page readiness waits for load, fonts and eager decode, but not lazy images", async () => {
  installDocument();
  const fonts = deferred(), image = deferred();
  let onLoad;
  let decoded = false;
  document.readyState = "loading";
  document.fonts.ready = fonts.promise;
  document.images = [
    { loading: "eager", decode: () => { decoded = true; return image.promise; } },
    { loading: "lazy", decode: () => { throw new Error("must not decode lazy image"); } },
    { loading: "", decode: () => Promise.reject(new Error("broken image")) },
  ];
  window.addEventListener = (type, callback) => { if (type === "load") onLoad = callback; };
  window.removeEventListener = () => {};
  let ready = false;
  const promise = waitForPageReady(new AbortController().signal).then(() => { ready = true; });
  assert.equal(decoded, false);
  onLoad();
  await Promise.resolve();
  assert.equal(decoded, true);
  assert.equal(ready, false);
  fonts.resolve();
  await Promise.resolve();
  assert.equal(ready, false);
  image.resolve();
  await promise;
  assert.equal(ready, true);
});

test("production loader is not disabled by session storage or debug delay", () => {
  const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
  const component = readFileSync(new URL("../src/components/Intro.astro", import.meta.url), "utf8");
  assert.equal(layout.includes("ar-intro-seen"), false);
  assert.match(component, /import\.meta\.env\.DEV \?/);
});


test("hero expands on both axes and every track finishes within four seconds", () => {
  const harness = installDocument();
  startIntro(Promise.resolve());
  const hero = harness.animations.find(animation => animation.target === "hero");
  assert.equal(hero.keyframes[0].clipPath, "inset(50% 50% round 0px)");
  assert.equal(hero.keyframes.at(-1).clipPath, "inset(0% 0% round var(--intro-radius))");
  assert.equal(INTRO_DURATION_MS, 4000);
  for (const animation of harness.animations) {
    assert.equal(animation.options.duration, 4000);
    assert.equal(animation.keyframes.at(-1).offset, 1);
  }
  harness.reduceMotion();
  assert.equal(harness.animations.every(animation => animation.cancelled), true);
});
