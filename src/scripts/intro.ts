const DURATION = 3200;
const STORAGE_KEY = "ar-intro-seen";

// Independent of the 3.2s storyboard. If the module never starts playback,
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

export function startIntro() {
  const root = document.documentElement;
  const intro = document.getElementById("intro");
  if (!intro || !root.classList.contains("intro-pending")) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches) {
    revealPage();
    return;
  }

  const scene = intro.querySelector(".intro-scene");
  const loading = intro.querySelector(".intro-loading");
  const cage = intro.querySelector(".intro-cage");
  const white = intro.querySelector(".intro-white");
  const detail = intro.querySelector(".intro-detail");
  const skip = intro.querySelector<HTMLButtonElement>("#intro-skip");
  if (!scene || !loading || !cage || !white || !detail || !skip) {
    revealPage();
    return;
  }

  const animations = [
    track(loading, [
      [0, { opacity: 1, visibility: "visible" }],
      [299, { opacity: 1, visibility: "visible" }],
      [300, { opacity: 0, visibility: "hidden" }],
      [3200, { opacity: 0, visibility: "hidden" }],
    ]),
    track(scene, [
      [0, { transform: "translate(390px, 180px) rotate(28deg) rotateY(0deg) scale(10.5)", opacity: 0 }],
      [300, { transform: "translate(390px, 180px) rotate(28deg) rotateY(0deg) scale(10.5)", opacity: 1 }],
      [750, { transform: "translate(330px, 145px) rotate(24deg) rotateY(0deg) scale(9)", opacity: 1, easing: "cubic-bezier(.65,0,.25,1)" }],
      [1550, { transform: "translate(0,0) rotate(-8deg) rotateY(-28deg) scale(1)", opacity: 1 }],
      [1850, { transform: "translate(0,0) rotate(-8deg) rotateY(-28deg) scale(1)", easing: "cubic-bezier(.4,0,.2,1)" }],
      [2450, { transform: "translate(0,0) rotate(0deg) rotateY(0deg) scale(1.08)" }],
      [3200, { transform: "translate(0,0) rotate(0deg) rotateY(0deg) scale(1.08)" }],
    ]),
    track(cage, [
      [0, { opacity: 0, strokeDasharray: 1400, strokeDashoffset: 1400 }],
      [1150, { opacity: 0, strokeDashoffset: 1400 }],
      [1350, { opacity: 0.9, strokeDashoffset: 1100 }],
      [1700, { opacity: 0.9, strokeDashoffset: 0 }],
      [2100, { opacity: 0.9, strokeDashoffset: 0 }],
      [2350, { opacity: 0, strokeDashoffset: 0 }],
      [3200, { opacity: 0 }],
    ]),
    track(white, [
      [0, { opacity: 0 }],
      [1800, { opacity: 0 }],
      [2420, { opacity: 1 }],
      [3200, { opacity: 1 }],
    ]),
    track(detail, [
      [0, { opacity: 0 }],
      [300, { opacity: 0.22, transform: "translateY(20px) skewY(-25deg)" }],
      [800, { opacity: 0.18, transform: "translateY(-25px) skewY(-25deg)" }],
      [1400, { opacity: 0 }],
      [3200, { opacity: 0 }],
    ]),
  ];

  // The overlay stays fully opaque until complete() hides it in one step.
  // Hero entrance motion is intentionally deferred.

  for (let index = 1; index <= 3; index += 1) {
    const echo = intro.querySelector(`.intro-echo-${index}`);
    if (!echo) continue;
    animations.push(
      track(echo, [
        [0, { opacity: 0 }],
        [300, { opacity: 0.05, transform: `translate(${index * 12}px, ${index * 6}px)` }],
        [650, { opacity: 0.2, transform: `translate(${index * 18}px, ${index * 8}px)` }],
        [1250, { opacity: 0, transform: "translate(0, 0)" }],
        [3200, { opacity: 0 }],
      ]),
    );
  }

  let frame = 0;
  let closed = false;
  let stallTimer = 0;

  const complete = () => {
    if (closed) return;
    closed = true;
    window.clearTimeout(stallTimer);
    cancelAnimationFrame(frame);
    for (const animation of animations) animation.cancel();
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Session storage can be unavailable. Dismissal still has to work.
    }
    reduced.removeEventListener("change", onReduce);
    intro.removeEventListener("keydown", onKeydown);
    skip.removeEventListener("click", complete);
    revealPage();
    const content = document.getElementById("content");
    content?.focus({ preventScroll: true });
  };

  const onReduce = () => {
    if (reduced.matches) complete();
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      complete();
      return;
    }
    if (event.key !== "Tab") return;
    event.preventDefault();
    skip.focus();
  };

  intro.hidden = false;
  root.classList.add("intro-playing");
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Playback can continue without persisting the session flag.
  }

  // Start at frame zero when playback is ready. Time spent waiting for this
  // module is not part of the storyboard and must not skip Loading.
  for (const animation of animations) {
    animation.currentTime = 0;
    animation.play();
  }
  stallTimer = window.setTimeout(complete, INTRO_PLAYBACK_FAILURE_MS);

  const watch = () => {
    const time = Number(animations[0]?.currentTime ?? DURATION);
    if (time >= DURATION) {
      complete();
      return;
    }
    frame = requestAnimationFrame(watch);
  };
  frame = requestAnimationFrame(watch);

  skip.addEventListener("click", complete);
  intro.addEventListener("keydown", onKeydown);
  reduced.addEventListener("change", onReduce);
  skip.focus({ preventScroll: true });
}
