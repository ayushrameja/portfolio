/** Native popover owns interaction; decorative exit copies never receive input. */
export function setupMenuMotion(menu: HTMLElement) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let entering: Animation[] = [];
  let exitLayer: HTMLElement | undefined;
  let cleanupTimer = 0;
  let faceTimers: number[] = [];

  const clearEntrance = () => {
    entering.forEach(animation => animation.cancel());
    entering = [];
  };
  const clearExit = () => {
    window.clearTimeout(cleanupTimer);
    faceTimers.forEach(timer => window.clearTimeout(timer));
    faceTimers = [];
    exitLayer?.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    exitLayer?.remove();
    exitLayer = undefined;
  };

  function enter() {
    clearExit();
    clearEntrance();
    if (reduced.matches) return;
    entering.push(menu.animate([
      { opacity: 0, transform: 'translateY(16px) scale(.97)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ], { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' }));
    menu.querySelectorAll('.menu-heading, a').forEach((item, index) => {
      entering.push(item.animate([
        { opacity: 0, transform: 'translateY(14px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 320, delay: 65 + index * 55, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)' }));
    });
  }

  // Capture resolved styles before leaving the top layer. Copies keep their
  // palette and SVG styling outside the hero, without duplicate interactive IDs.
  function snapshot(source: Element): HTMLElement {
    const copy = source.cloneNode(true) as HTMLElement;
    copy.dataset.exitCopy = "";
    const originals = [source, ...source.querySelectorAll('*')];
    const copies = [copy, ...copy.querySelectorAll<HTMLElement | SVGElement>('*')];
    originals.forEach((original, index) => {
      const target = copies[index];
      const computed = getComputedStyle(original);
      for (const property of computed) target.style.setProperty(property, computed.getPropertyValue(property));
      for (const attribute of ['id', 'popover', 'href', 'tabindex', 'autofocus']) target.removeAttribute(attribute);
      target.style.animation = 'none';
      target.style.transition = 'none';
      target.style.outline = 'none';
    });
    const rect = source.getBoundingClientRect();
    Object.assign(copy.style, {
      position: 'fixed', inset: 'auto', left: `${rect.left}px`, top: `${rect.top}px`,
      width: `${rect.width}px`, height: `${rect.height}px`, margin: '0',
      transform: 'none', overflow: 'visible', pointerEvents: 'none',
    });
    return copy;
  }

  function leave() {
    clearEntrance();
    clearExit();
    if (reduced.matches || !menu.matches(':popover-open')) return;
    const layer = document.createElement('div');
    layer.dataset.menuExit = '';
    layer.inert = true;
    layer.setAttribute('aria-hidden', 'true');
    Object.assign(layer.style, { position: 'fixed', inset: '0', overflow: 'clip', pointerEvents: 'none', zIndex: '1000' });
    const tiles = snapshot(menu);
    const panel = tiles.cloneNode(true) as HTMLElement;
    panel.querySelectorAll('a').forEach(item => item.style.visibility = 'hidden');
    const heading = tiles.querySelector<HTMLElement>('.menu-heading');
    if (heading) heading.style.visibility = 'hidden';
    const surface = getComputedStyle(menu).backgroundColor;
    Object.assign(tiles.style, { background: 'transparent', borderColor: 'transparent', boxShadow: 'none' });
    layer.append(panel, tiles);
    document.body.append(layer);
    exitLayer = layer;

    panel.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(36px)' },
    ], { duration: 240, fill: 'forwards', easing: 'cubic-bezier(.4,0,1,1)' });
    const animations: Animation[] = [];
    const rows = tiles.querySelectorAll<HTMLAnchorElement>('a');
    const faces = [
      ['(o_o)', '(O_O)', 'xxOxx'],
      ['(-_-)', '(>_<)', 'x_x'],
      ['(._.)', '(@_@)', 'XoX'],
      ['(^_^)', '(o_O)', '(T_T)'],
    ];
    const ink = getComputedStyle(menu).color;
    rows.forEach((item, index) => {
      // Alternate the lean and release time: each tile falls independently,
      // accelerates under gravity, and fades throughout its fall.
      const direction = index % 2 === 0 ? -1 : 1;
      const distance = innerHeight - item.getBoundingClientRect().top + 100;
      item.style.background = surface;
      item.style.color = ink;
      item.style.webkitTextFillColor = 'currentColor';
      item.querySelectorAll<HTMLElement | SVGElement>('*').forEach(child => {
        child.style.color = ink;
        child.style.webkitTextFillColor = 'currentColor';
      });
      item.querySelectorAll<SVGElement>('svg, path').forEach(child => child.style.stroke = 'currentColor');
      const delay = (rows.length - 1 - index) * 65;
      const label = item.querySelector<HTMLElement>('span:not(.menu-number)');
      if (label) {
        faces[index % faces.length].forEach((face, frame) => {
          faceTimers.push(window.setTimeout(() => {
            label.textContent = face;
            label.style.fontFamily = 'ui-monospace, monospace';
            label.style.letterSpacing = '.08em';
          }, delay + 40 + frame * 155));
        });
      }
      item.style.borderRadius = '12px';
      item.style.gridTemplateColumns = '22px minmax(0,1fr) 16px';
      item.querySelectorAll<HTMLElement>('span').forEach(span => span.style.width = 'auto');
      item.style.transformOrigin = index % 2 === 0 ? '35% 50%' : '65% 50%';
      animations.push(item.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: 0 },
        { transform: `translate(${direction * 8}px,${distance * .08}px) rotate(${direction * 5}deg)`, opacity: .68, offset: .3 },
        { transform: `translate(${direction * 24}px,${distance * .65}px) rotate(${direction * 15}deg)`, opacity: .16, offset: .8 },
        { transform: `translate(${direction * 36}px,${distance}px) rotate(${direction * 23}deg)`, opacity: 0, offset: 1 },
      ], { duration: 650, delay, fill: 'forwards', easing: 'cubic-bezier(.4,0,1,1)' }));
    });
    const finishedLayer = layer;
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (exitLayer === finishedLayer) clearExit();
    });
    cleanupTimer = window.setTimeout(clearExit, 1400);
  }

  menu.addEventListener('beforetoggle', event => {
    if ((event as ToggleEvent).newState === 'closed') leave();
    else clearExit();
  });
  reduced.addEventListener('change', () => { clearEntrance(); clearExit(); });
  window.addEventListener('pagehide', () => { clearEntrance(); clearExit(); });
  return { enter };
}
