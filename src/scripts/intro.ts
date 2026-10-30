export const INTRO_DURATION_MS = 4000;
const DURATION = INTRO_DURATION_MS;
export const INTRO_READY_HOLD_MS = 1190;
// Failed or indefinitely pending resources must not trap visitors.
export const PAGE_READY_FAILURE_MS = 15000;

// Independent of the 4s storyboard. If the module never starts playback,
// the inline head timeout uses this same value to drop the overlay.
export const INTRO_INIT_FAILURE_MS = 6000;
// A late module may wait this long and still play from the first frame.
export const MAX_INTRO_START_DELAY_MS = 4500;
// Backup for a clock that never reaches the end of the storyboard.
export const INTRO_PLAYBACK_FAILURE_MS = DURATION + 800;
export const INTRO_DELAY_QUERY = "introDelay";

export function scheduleIntro(rawDelay: string | null, start: () => void) {
  if (rawDelay === "hold") return;
  const delay = Number(rawDelay);
  if (rawDelay !== null && Number.isFinite(delay) && delay > 0 && delay <= MAX_INTRO_START_DELAY_MS) {
    window.setTimeout(start, delay);
    return;
  }
  start();
}

// Wait for the document, fonts, and decoded eager images. Lazy images below
// the fold are deliberately excluded: scrolling is needed to request them.
export async function waitForPageReady(signal: AbortSignal) {
  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === "complete" || signal.aborted) return resolve();
    const done = () => {
      window.removeEventListener("load", done);
      signal.removeEventListener("abort", done);
      resolve();
    };
    window.addEventListener("load", done, { once: true });
    signal.addEventListener("abort", done, { once: true });
  });
  await loaded;
  if (signal.aborted) return;
  const images = Array.from(document.images)
    .filter((image) => image.loading !== "lazy")
    .map((image) => image.decode().catch(() => {}));
  // A broken image/font is settled, not an endless loading state.
  await Promise.allSettled([document.fonts.ready, ...images]);
}

type Frame = [number, Record<string, string | number>];

function track(element: Element, frames: Frame[]) {
  const animation = element.animate(
    frames.map(([ms, props]) => ({ ...props, offset: ms / DURATION })),
    { duration: DURATION, fill: "both", easing: "linear" },
  );
  animation.pause();
  return animation;
}

function revealPage() {
  const root = document.documentElement;
  root.classList.remove("intro-pending", "intro-playing");
  document.getElementById("intro")?.setAttribute("hidden", "");
  document.getElementById("site-shell")?.removeAttribute("inert");
}

export function startIntro(readiness?: Promise<void>) {
  const root = document.documentElement;
  const intro = document.getElementById("intro");
  if (!intro || !root.classList.contains("intro-pending")) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) {
    revealPage();
    return;
  }

  const white = intro.querySelector(".intro-white");
  const logo = intro.querySelector(".intro-logo");
  const backdrop = intro.querySelector(".intro-backdrop");
  const hero = document.querySelector(".hero");
  if (!white || !logo || !backdrop || !hero) { revealPage(); return; }
  const animations: Animation[] = [];
  try {
    animations.push(track(white, [[0, { opacity: 1, easing: "ease-in-out" }], [857, { opacity: 0 }], [DURATION, { opacity: 0 }]]));
    animations.push(track(logo, [[0, { opacity: 0 }], [619, { opacity: 0, easing: "ease-in-out" }], [1190, { opacity: 1 }], [1571, { opacity: 1, easing: "ease-in-out" }], [2048, { opacity: 0 }], [DURATION, { opacity: 0 }]]));
    // Remove the opaque backdrop only when the still-closed hero begins opening.
    animations.push(track(backdrop, [[0, { opacity: 1 }], [1761, { opacity: 1 }], [1762, { opacity: 0 }], [DURATION, { opacity: 0 }]]));
    animations.push(track(hero, [
      [0, { clipPath: "inset(50% 50% round 0px)" }],
      [1762, { clipPath: "inset(50% 50% round 0px)", easing: "cubic-bezier(.65,0,.25,1)" }],
      [3381, { clipPath: "inset(0% 0% round var(--intro-radius))" }],
      [DURATION, { clipPath: "inset(0% 0% round var(--intro-radius))" }],
    ]));
    const entrances: [string, number, number, number][] = [
      [".hero-portrait", 2619, 3381, 8], [".marquee-window", 2381, 3286, 0],
      ["#hero-title", 2667, 3476, 8], [".hero-description", 2762, 3571, 8],
      [".work-link", 2905, 3714, 8], [".hero-header", 2810, 3714, 0], [".hero-footer", 2905, 3810, 0],
    ];
    for (const [selector, start, end, y] of entrances) {
      const element = hero.querySelector(selector);
      if (!element) continue;
      // Individual translate preserves the marquee's existing transform.
      animations.push(track(element, [[0, { opacity: 0, translate: `0 ${y}px` }],
        [start, { opacity: 0, translate: `0 ${y}px`, easing: "cubic-bezier(.22,1,.36,1)" }],
        [end, { opacity: 1, translate: "0 0" }], [DURATION, { opacity: 1, translate: "0 0" }]]));
    }
  } catch {
    for (const animation of animations) animation.cancel();
    revealPage();
    return;
  }

  let frame = 0;
  let closed = false;
  let stallTimer = 0;
  let readyTimer = 0;
  let pageReady = false;
  let animationFinished = false;
  let waitingForReady = false;
  const loadingController = new AbortController();

  const complete = () => {
    if (closed) return;
    closed = true;
    window.clearTimeout(stallTimer);
    window.clearTimeout(readyTimer);
    loadingController.abort();
    cancelAnimationFrame(frame);
    for (const animation of animations) animation.cancel();
    reduced.removeEventListener("change", onReduce);
    intro.removeEventListener("keydown", onKeydown);
    revealPage();
    const content = document.getElementById("content");
    content?.focus({ preventScroll: true });
  };

  const onReduce = () => {
    if (reduced.matches) complete();
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    intro.focus();
  };

  intro.hidden = false;
  root.classList.add("intro-playing");

  // Start at frame zero when playback is ready. Time spent waiting for this
  // module is not part of the storyboard and must not skip Loading.
  for (const animation of animations) {
    animation.currentTime = 0;
    animation.play();
  }
  const revealWhenReady = () => {
    if (closed) return;
    if (animationFinished && pageReady) complete();
    else if (animationFinished) intro.setAttribute("data-waiting", "");
  };
  const markReady = () => {
    if (closed) return;
    pageReady = true;
    window.clearTimeout(readyTimer);
    if (waitingForReady) {
      waitingForReady = false;
      intro.removeAttribute("data-waiting");
      for (const animation of animations) animation.play();
      lastTime = INTRO_READY_HOLD_MS;
      window.clearTimeout(stallTimer);
      stallTimer = window.setTimeout(checkPlayback, INTRO_PLAYBACK_FAILURE_MS);
      frame = requestAnimationFrame(watch);
    }
    revealWhenReady();
  };
  readyTimer = window.setTimeout(() => {
    loadingController.abort();
    markReady();
  }, PAGE_READY_FAILURE_MS);
  (readiness ?? waitForPageReady(loadingController.signal)).then(markReady, markReady);

  // Only recover a genuinely stalled animation. Background-tab throttling or
  // slow assets must never turn this watchdog into a storyboard cutoff.
  const holdForReadiness = (time: number) => {
    if (pageReady || time < INTRO_READY_HOLD_MS) return false;
    for (const animation of animations) {
      animation.pause();
      animation.currentTime = INTRO_READY_HOLD_MS;
    }
    waitingForReady = true;
    intro.setAttribute("data-waiting", "");
    return true;
  };
  let lastTime = 0;
  const checkPlayback = () => {
    if (closed || animationFinished) return;
    const time = Number(animations[0]?.currentTime ?? 0);
    if (holdForReadiness(time)) {
      lastTime = INTRO_READY_HOLD_MS;
      stallTimer = window.setTimeout(checkPlayback, INTRO_PLAYBACK_FAILURE_MS);
      return;
    }
    if (time >= DURATION) {
      animationFinished = true;
      revealWhenReady();
      return;
    }
    if (!document.hidden && time <= lastTime) {
      complete(); // Animation API failed to advance; keep the page usable.
      return;
    }
    lastTime = time;
    stallTimer = window.setTimeout(checkPlayback, INTRO_PLAYBACK_FAILURE_MS);
  };
  stallTimer = window.setTimeout(checkPlayback, INTRO_PLAYBACK_FAILURE_MS);

  const watch = () => {
    const time = Number(animations[0]?.currentTime ?? DURATION);
    if (holdForReadiness(time)) return;
    if (time >= DURATION) {
      animationFinished = true;
      window.clearTimeout(stallTimer);
      revealWhenReady();
      return;
    }
    frame = requestAnimationFrame(watch);
  };
  frame = requestAnimationFrame(watch);

  intro.addEventListener("keydown", onKeydown);
  reduced.addEventListener("change", onReduce);
  intro.focus({ preventScroll: true });
}
