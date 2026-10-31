/** A small, per-page hover memory; no animation loop runs while idle. */
export function setupButtonEyes(button: HTMLAnchorElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lids = Array.from(button.querySelectorAll<HTMLElement>('.eye-lid'));
  let visits = 0;
  let active = false;
  let pointerInside = false;
  let keyboardFocus = false;
  let blinkTimer = 0;
  let glanceTimer = 0;
  let blinks: Animation[] = [];

  function look(x = 0, y = 0) {
    button.style.setProperty('--eye-look-x', `${x}px`);
    button.style.setProperty('--eye-look-y', `${y}px`);
    button.style.setProperty('--eye-drift-x', `${x * .6}px`);
  }
  function stop() {
    active = false;
    clearTimeout(blinkTimer);
    clearTimeout(glanceTimer);
    blinks.forEach(animation => animation.cancel());
    blinks = [];
    button.classList.remove('eyes-active', 'eyes-curious');
    look();
  }
  function blink() {
    if (!active) return;
    blinks.forEach(animation => animation.cancel());
    blinks = lids.map((lid, index) => lid.animate([
      { transform: 'scaleY(1)', offset: 0 },
      { transform: 'scaleY(.08)', offset: .4 },
      { transform: 'scaleY(.08)', offset: .55 },
      { transform: 'scaleY(1)', offset: 1 },
    ], { duration: 190, delay: index * 30, easing: 'ease-in-out' }));
    blinkTimer = window.setTimeout(blink, 3100);
  }
  function glance(direction = 1) {
    if (!active || visits < 2) return;
    look(direction * 1.8, direction > 0 ? -.7 : .7);
    glanceTimer = window.setTimeout(() => glance(-direction), 1800);
  }
  function start() {
    if (active || reduced.matches || document.hidden) return;
    active = true;
    visits = Math.min(visits + 1, 2);
    button.classList.add('eyes-active');
    button.classList.toggle('eyes-curious', visits > 1);
    blinkTimer = window.setTimeout(blink, 1250);
    if (visits > 1) glanceTimer = window.setTimeout(() => glance(), 500);
  }
  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    start();
  });
  button.addEventListener('pointerleave', () => {
    pointerInside = false;
    if (!keyboardFocus) stop();
  });
  button.addEventListener('pointermove', event => {
    if (!active || visits < 2 || event.pointerType === 'touch') return;
    const rect = button.getBoundingClientRect();
    const x = Math.max(-2, Math.min(2, (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 4)));
    const y = Math.max(-1.2, Math.min(1.2, (event.clientY - (rect.top + rect.height / 2)) / 14));
    look(x, y);
    clearTimeout(glanceTimer);
    glanceTimer = window.setTimeout(() => glance(), 1800);
  });
  button.addEventListener('focus', () => {
    keyboardFocus = button.matches(':focus-visible');
    if (keyboardFocus) start();
  });
  button.addEventListener('blur', () => {
    keyboardFocus = false;
    if (!pointerInside) stop();
  });
  reduced.addEventListener('change', () => {
    stop();
    if (!reduced.matches && (pointerInside || keyboardFocus)) start();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (pointerInside || keyboardFocus) start();
  });
  window.addEventListener('pagehide', stop);
}
