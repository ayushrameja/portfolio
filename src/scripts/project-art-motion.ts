/** Slow artwork loops, paused offscreen or by the visitor. Copy and links stay still. */
export function setupProjectArtMotion(root: HTMLElement) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cards = root.querySelectorAll<HTMLElement>(".card");
  const toggle = root.querySelector<HTMLButtonElement>("[data-art-motion-toggle]");
  const running = new Map<HTMLElement, Animation[]>();
  const visible = new Set<HTMLElement>();
  let paused = false;
  let suspended = false;

  const create = (card: HTMLElement) => {
    const animations: Animation[] = [];
    const loop = (selector: string, from: string, to: string, duration = 12000) => {
      card.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        const animation = element.animate([
          { transform: from }, { transform: to }, { transform: from },
        ], { duration, iterations: Infinity, easing: "cubic-bezier(.45, 0, .55, 1)" });
        animation.currentTime = index * 1800;
        animations.push(animation);
      });
    };
    loop(".learning-map:not(.service-map) .learning-signal i", "translateX(0)", "translateX(200%)", 12000);
    loop(".shot img", "scale(1)", "scale(1.035)", 14000);
    loop(".site-view img", "scale(.96)", "scale(1)", 14000);
    loop(".pulse-track svg", "scaleY(.86)", "scaleY(1)");
    loop(".service-flow i", "translateX(0)", "translateX(250%)", 10000);
    loop(".journey-stop > svg", "translateY(0)", "translateY(-5px)", 10000);
    loop(".service-core > svg", "scale(.92)", "scale(1.06)", 10000);
    const travel = (selector: string, frames: Keyframe[], duration: number) => {
      card.querySelectorAll<SVGElement>(selector).forEach((element, index) => {
        const animation = element.animate(frames, { duration, iterations: Infinity, easing: "linear" });
        animation.currentTime = index * duration / 2;
        animations.push(animation);
      });
    };
    travel(".journey-dashes", [
      { strokeDashoffset: "0" },
      { strokeDashoffset: "-40" },
    ], 10000);
    travel(".service-packet", [
      { transform: "translateX(0px)", opacity: 0, offset: 0 },
      { transform: "translateX(8px)", opacity: 1, offset: .15 },
      { transform: "translateX(52px)", opacity: 1, offset: .85 },
      { transform: "translateX(60px)", opacity: 0, offset: 1 },
    ], 10000);
    running.set(card, animations);
    return animations;
  };
  const sync = () => {
    if (toggle) {
      toggle.hidden = reduced.matches;
      const label = paused ? "Resume artwork" : "Pause artwork";
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
      toggle.setAttribute("aria-pressed", String(paused));
    }
    if (reduced.matches) {
      running.forEach(animations => animations.forEach(animation => animation.cancel()));
      running.clear();
      return;
    }
    cards.forEach(card => {
      const active = visible.has(card) && !paused && !suspended && !document.hidden;
      const animations = running.get(card) ?? (active ? create(card) : []);
      animations.forEach(animation => active ? animation.play() : animation.pause());
    });
  };
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const card = (entry.target as HTMLElement).closest<HTMLElement>(".card");
      if (!card) continue;
      if (entry.isIntersecting && entry.intersectionRatio > 0) visible.add(card);
      else visible.delete(card);
    }
    sync();
  }, { threshold: 0 });
  cards.forEach(card => {
    const art = card.querySelector<HTMLElement>(".card-art");
    if (art) observer.observe(art);
  });
  toggle?.addEventListener("click", () => { paused = !paused; sync(); });
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", () => { suspended = true; sync(); });
  window.addEventListener("pageshow", () => { suspended = false; sync(); });
  sync();
}
