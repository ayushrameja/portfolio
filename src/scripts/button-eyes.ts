/** Bounded positions keep the eyebrows and eyes inside the button's dark base. */
export function eyePosition(width: number, fraction: number) {
  return (Math.max(0, Math.min(1, fraction)) - .5) * Math.max(0, width - 76);
}

/** Short visits, not a permanent animation loop. Timers sleep offscreen/hidden. */
export function setupButtonEyes(button: HTMLAnchorElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lids = Array.from(button.querySelectorAll<HTMLElement>('.eye-lid'));
  const timers = new Set<number>();
  let blinks: Animation[] = [];
  let inView = false;
  let active = false;
  let pointerInside = false;
  let keyboardFocus = false;
  let firstVisit = true;
  let paused = false;
  let wanderTimer = 0;
  let lastMove = 0;

  const later = (callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => { timers.delete(timer); callback(); }, delay);
    timers.add(timer);
    return timer;
  };
  const canPlay = () => inView && !paused && !reduced.matches && !document.hidden &&
    !document.documentElement.classList.contains('intro-pending');
  const look = (x = 0, y = 0) => {
    button.style.setProperty('--eye-look-x', `${x}px`);
    button.style.setProperty('--eye-look-y', `${y}px`);
  };
  const move = (fraction: number) => {
    button.style.setProperty('--eye-drift-x', `${eyePosition(button.clientWidth, fraction)}px`);
    button.style.setProperty('--eye-drift-y', `${-Math.random() * 2}px`);
    button.style.setProperty('--eye-lean', `${(fraction - .5) * -4}deg`);
  };
  const clear = () => {
    timers.forEach(timer => clearTimeout(timer));
    timers.clear();
    blinks.forEach(animation => animation.cancel());
    blinks = [];
  };
  const stop = () => {
    clear();
    active = false;
    button.classList.remove('eyes-active', 'eyes-curious');
    look();
  };
  const blink = () => {
    if (!active || !canPlay()) return;
    blinks.forEach(animation => animation.cancel());
    blinks = lids.map((lid, index) => lid.animate([
      { transform: 'scaleY(1)' }, { transform: 'scaleY(.08)', offset: .45 },
      { transform: 'scaleY(1)' },
    ], { duration: 210, delay: index * 35, easing: 'ease-in-out' }));
    later(blink, 2300 + Math.random() * 1500);
  };
  const wander = () => {
    if (!active || !canPlay()) return;
    const position = Math.random();
    move(position);
    look((position - .5) * 4, -.5);
    button.classList.toggle('eyes-curious', Math.random() > .4);
    wanderTimer = later(wander, 1100 + Math.random() * 1100);
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
    later(blink, 950);
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
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    start();
  });
  button.addEventListener('pointerleave', () => {
    pointerInside = false;
    if (!keyboardFocus) { stop(); scheduleVisit(); }
  });
  button.addEventListener('pointermove', event => {
    if (!active || event.pointerType === 'touch') return;
    const rect = button.getBoundingClientRect();
    const eyes = button.querySelector('.work-eyes')!.getBoundingClientRect();
    look(Math.max(-2, Math.min(2, (event.clientX - (eyes.left + eyes.width / 2)) / 24)),
      Math.max(-1.2, Math.min(1.2, (event.clientY - (eyes.top + eyes.height / 2)) / 14)));
    // Retarget the pair at a calm cadence while pupils track every pointer move.
    if (performance.now() - lastMove > 180) {
      move((event.clientX - rect.left) / rect.width);
      lastMove = performance.now();
    }
    clearTimeout(wanderTimer);
    timers.delete(wanderTimer);
    wanderTimer = later(wander, 1900);
  });
  button.addEventListener('focus', () => {
    keyboardFocus = button.matches(':focus-visible');
    if (keyboardFocus) start();
  });
  button.addEventListener('blur', () => {
    keyboardFocus = false;
    if (!pointerInside) { stop(); scheduleVisit(); }
  });
  new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    resume();
  }, { threshold: .5 }).observe(button);
  new MutationObserver(resume).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  reduced.addEventListener('change', resume);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pointerInside = false;
    resume();
  });
  window.addEventListener('pagehide', () => { paused = true; stop(); });
  window.addEventListener('pageshow', () => { paused = false; resume(); });
}
