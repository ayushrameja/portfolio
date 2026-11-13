import { createPageScope } from "./page-scope.ts";
/** Bounded positions keep the eyebrows and eyes inside the button's base. */
export function eyePosition(width: number, fraction: number) {
  return (Math.max(0, Math.min(1, fraction)) - .5) * Math.max(0, width - 76);
}

const moods = ['curious', 'surprised', 'shifty', 'sleepy', 'asleep', 'dizzy'].map(mood => `eyes-${mood}`);

/** Short visits, not a permanent animation loop. Timers sleep offscreen/hidden.
 *  While out, the eyes watch the pointer, startle when pressed or caught
 *  peeking, nod off if it rests on them, and go dizzy if it is shaken. */
export function setupButtonEyes(button: HTMLAnchorElement) {
  const scope = createPageScope();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const eyes = Array.from(button.querySelectorAll<HTMLElement>('.eye'));
  const lids = Array.from(button.querySelectorAll<HTMLElement>('.eye-lid'));
  const timers = new Set<number>();
  let blinks: Animation[] = [];
  let inView = false;
  let active = false;
  let pointerInside = false;
  let keyboardFocus = false;
  let firstVisit = true;
  let paused = false;
  let dizzy = false;
  let wanderTimer = 0;
  let idleTimer = 0;
  let moodTimer = 0;
  let frame = 0;
  let lastMove = 0;
  let lastPointer = 0;
  let trail: { x: number; y: number; at: number }[] = [];

  const later = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => { timers.delete(timer); callback(); }, delay);
    timers.add(timer);
    return timer;
  };
  const cancel = (timer: number) => { clearTimeout(timer); timers.delete(timer); };
  const canPlay = () => inView && !paused && !reduced.matches && !document.hidden &&
    !document.documentElement.hasAttribute('data-intro');
  // Each eye aims on its own, so a target between them crosses them.
  const gaze = (x: number, y: number) => eyes.forEach(eye => {
    const box = eye.getBoundingClientRect();
    const dx = x - (box.left + box.width / 2);
    const dy = y - (box.top + box.height / 2);
    const distance = Math.hypot(dx, dy) || 1;
    const reach = Math.min(1, distance / 48);
    eye.style.setProperty('--look-x', `${dx / distance * 3.2 * reach}px`);
    eye.style.setProperty('--look-y', `${dy / distance * 2.4 * reach}px`);
  });
  const ahead = () => eyes.forEach(eye => {
    eye.style.removeProperty('--look-x');
    eye.style.removeProperty('--look-y');
  });
  const mood = (name?: string, duration?: number) => {
    cancel(moodTimer);
    button.classList.remove(...moods);
    if (!name) return;
    button.classList.add(`eyes-${name}`);
    if (duration) moodTimer = later(() => button.classList.remove(`eyes-${name}`), duration);
  };
  const move = (fraction: number) => {
    button.style.setProperty('--eye-drift-x', `${eyePosition(button.clientWidth, fraction)}px`);
    button.style.setProperty('--eye-drift-y', `${-Math.random() * 2}px`);
    button.style.setProperty('--eye-lean', `${(fraction - .5) * -4}deg`);
  };
  const clear = () => {
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
    cancelAnimationFrame(frame);
    blinks.forEach(animation => animation.cancel());
    blinks = [];
    dizzy = false;
    trail = [];
  };
  const stop = () => {
    clear();
    active = false;
    button.classList.remove('eyes-active', ...moods);
    ahead();
  };
  // The lid drops over the eye and lifts again; empty keyframes keep whatever
  // half-closed position the current mood has set.
  const blink = (twice = Math.random() > .75) => {
    blinks.forEach(animation => animation.cancel());
    blinks = lids.map((lid, index) => lid.animate([{}, { transform: 'translateY(0)', offset: .45 }, {}],
      { duration: 190, delay: index * 22, easing: 'ease-in-out' }));
    if (twice) later(() => blink(false), 250);
  };
  const blinkLoop = () => {
    if (!active || !canPlay()) return;
    if (!dizzy) blink();
    later(blinkLoop, 2100 + Math.random() * 1700);
  };
  scope.add(() => { paused = true; stop(); });
  // Left alone, the eyes glance about; now and then they check both ways first.
  const wander = () => {
    if (!active || !canPlay()) return;
    // A resting pointer holds their attention instead.
    if (pointerInside) { wanderTimer = later(wander, 1500); return; }
    const box = button.getBoundingClientRect();
    const level = box.top + box.height / 2;
    const undisturbed = () => active && performance.now() - lastPointer > 400;
    move(Math.random());
    if (Math.random() < .28) {
      mood('shifty', 1500);
      gaze(box.left - 300, level);
      later(() => { if (undisturbed()) gaze(box.right + 300, level); }, 520);
      later(() => { if (undisturbed()) { ahead(); blink(true); } }, 1080);
      wanderTimer = later(wander, 2100);
      return;
    }
    // Either side, up at the name, the arrow, or straight out at the visitor.
    const spots = [[box.left - 240, level], [box.right + 240, level], [box.left + box.width / 2, box.top - 220], [box.right - 30, box.top]];
    const spot = spots[Math.floor(Math.random() * (spots.length + 1))];
    if (spot) gaze(spot[0], spot[1]); else ahead();
    mood(Math.random() > .5 ? 'curious' : undefined);
    wanderTimer = later(wander, 1000 + Math.random() * 1100);
  };
  const drowse = () => {
    cancel(idleTimer);
    if (!pointerInside) return;
    idleTimer = later(() => {
      mood('sleepy');
      idleTimer = later(() => mood('asleep'), 2200);
    }, 3200);
  };
  // Pupils circle in opposite directions until the eyes recover.
  const spin = () => {
    dizzy = true;
    trail = [];
    mood('dizzy');
    const began = performance.now();
    const turn = (now: number) => {
      const elapsed = now - began;
      if (!active || elapsed > 1400) {
        dizzy = false;
        mood();
        ahead();
        blink(true);
        return;
      }
      eyes.forEach((eye, index) => {
        const angle = elapsed / 70 * (index ? -1 : 1);
        eye.style.setProperty('--look-x', `${Math.cos(angle) * 3}px`);
        eye.style.setProperty('--look-y', `${Math.sin(angle) * 2.4}px`);
      });
      frame = requestAnimationFrame(turn);
    };
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(turn);
  };
  const scheduleVisit = () => {
    if (canPlay()) later(start, firstVisit ? 450 : 4200 + Math.random() * 6000);
  };
  function start() {
    if (active || !canPlay()) return;
    clear();
    firstVisit = false;
    active = true;
    move(.2 + Math.random() * .6);
    button.classList.add('eyes-active');
    later(blinkLoop, 950);
    wanderTimer = later(wander, 800);
    later(() => {
      if (pointerInside || keyboardFocus) return;
      stop();
      scheduleVisit();
    }, 2600 + Math.random() * 1500);
  }
  const resume = () => {
    stop();
    if (pointerInside || keyboardFocus) start();
    else scheduleVisit();
  };
  scope.listen(button, 'pointerenter', event => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    // Caught mid-peek, they jump.
    if (active) mood('surprised', 380);
    else start();
    drowse();
  });
  scope.listen(button, 'pointerleave', () => {
    pointerInside = false;
    cancel(idleTimer);
    if (keyboardFocus) return;
    // They watch the pointer go before ducking back under.
    later(() => {
      if (pointerInside || keyboardFocus) return;
      stop();
      scheduleVisit();
    }, 600);
  });
  scope.listen(button, 'pointerdown', event => {
    if (active && event.pointerType !== 'touch') mood('surprised', 520);
  });
  scope.listen(window, 'pointermove', event => {
    if (!active || event.pointerType === 'touch') return;
    const now = performance.now();
    lastPointer = now;
    if (button.classList.contains('eyes-sleepy') || button.classList.contains('eyes-asleep')) mood('surprised', 420);
    drowse();
    if (!dizzy) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => gaze(event.clientX, event.clientY));
    }
    cancel(wanderTimer);
    wanderTimer = later(wander, 1900);
    if (!pointerInside) return;
    // Retarget the pair at a calm cadence while pupils track every pointer move.
    if (now - lastMove > 180) {
      const rect = button.getBoundingClientRect();
      move((event.clientX - rect.left) / rect.width);
      lastMove = now;
    }
    // Shaking the pointer over them covers a lot of ground in very little time.
    trail.push({ x: event.clientX, y: event.clientY, at: now });
    trail = trail.filter(point => now - point.at < 420);
    const travelled = trail.reduce((sum, point, index) => index ? sum + Math.hypot(point.x - trail[index - 1].x, point.y - trail[index - 1].y) : 0, 0);
    if (!dizzy && travelled > 620) spin();
  }, { passive: true });
  scope.listen(button, 'focus', () => {
    keyboardFocus = button.matches(':focus-visible');
    if (keyboardFocus) start();
  });
  scope.listen(button, 'blur', () => {
    keyboardFocus = false;
    if (!pointerInside) { stop(); scheduleVisit(); }
  });
  scope.observe(new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    resume();
  }, { threshold: .5 })).observe(button);
  scope.observe(new MutationObserver(resume)).observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] });
  scope.listen(reduced, 'change', resume);
  scope.listen(document, 'visibilitychange', () => {
    if (document.hidden) pointerInside = false;
    resume();
  });
  scope.listen(window, 'pagehide', () => { paused = true; stop(); });
  scope.listen(window, 'pageshow', () => { paused = false; resume(); });
}
