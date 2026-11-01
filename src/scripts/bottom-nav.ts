type SectionPosition = { id: string; label: string; top: number };

export function currentSection(sections: SectionPosition[], activationLine: number) {
  return sections.reduce<SectionPosition | undefined>((active, section) =>
    section.top <= activationLine ? section : active, sections[0]);
}

export function nearestPreview(centers: number[], viewportCenter: number) {
  return centers.reduce((best, center, index) =>
    Math.abs(center - viewportCenter) < Math.abs(centers[best] - viewportCenter) ? index : best, 0);
}

/** Stay available after the threshold, including continuous downward scrolling. */
export function dockVisible({ progress, viewport, menuOpen }: {
  progress: number; viewport: number; menuOpen: boolean;
}) {
  return menuOpen || progress >= viewport * .2;
}

export function setupBottomNav() {
  const nav = document.querySelector<HTMLElement>('.bottom-nav');
  const hero = document.querySelector<HTMLElement>('.hero-frame');
  const trigger = nav?.querySelector<HTMLButtonElement>('.dock-trigger');
  const menu = nav?.querySelector<HTMLElement>('.dock-panel');
  const label = nav?.querySelector<HTMLElement>('.dock-label');
  const track = nav?.querySelector<HTMLElement>('.dock-track');
  const resume = nav?.querySelector<HTMLElement>('.dock-resume');
  if (!nav || !hero || !trigger || !menu || !label || !track || !resume) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
  const links = Array.from(track.querySelectorAll<HTMLAnchorElement>('.dock-preview'));
  const count = nav.querySelector<HTMLElement>('.dock-count')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0;
  let activeId = 'home';
  let wheelTimer = 0;
  let wheelAxis: 'horizontal' | 'vertical' | undefined;
  let previewFrame = 0;
  let scrollFrame = 0;

  const reflectSelection = (index: number) => {
    if (selected === index && links[index]?.dataset.selected === 'true') return;
    selected = index;
    links.forEach((link, i) => { link.dataset.selected = String(i === index); });
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(links.length).padStart(2, '0')}`;
  };
  const goToPreview = (index: number, smooth = true) => {
    const target = links[Math.max(0, Math.min(links.length - 1, index))];
    if (!target) return;
    const left = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
    track.scrollTo({ left, behavior: smooth && !reduced.matches ? 'smooth' : 'instant' });
    reflectSelection(links.indexOf(target));
  };
  const close = (restoreFocus = false) => {
    const wasOpen = !menu.hidden;
    cancelAnimationFrame(previewFrame);
    menu.hidden = true;
    nav.dataset.open = 'false';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `${label.textContent}, explore sections`);
    if (restoreFocus) trigger.focus({ preventScroll: true });
    if (wasOpen) schedule();
  };
  trigger.addEventListener('click', () => {
    if (!menu.hidden) { close(); return; }
    menu.hidden = false;
    nav.dataset.open = 'true';
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', 'Close section previews');
    previewFrame = requestAnimationFrame(() => {
      goToPreview(Math.max(0, links.findIndex(link => link.dataset.section === activeId)), false);
    });
  });
  new ResizeObserver(() => {
    if (menu.hidden || wheelTimer) return;
    cancelAnimationFrame(previewFrame);
    previewFrame = requestAnimationFrame(() => goToPreview(selected, false));
  }).observe(track);
  track.addEventListener('scroll', () => {
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    reflectSelection(nearestPreview(links.map(link => {
      const rect = link.getBoundingClientRect();
      return rect.left + rect.width / 2;
    }), center));
  }, { passive: true });
  track.addEventListener('wheel', event => {
    if (event.ctrlKey) return;
    // Choose once per gesture so diagonal trackpad momentum cannot switch handlers.
    wheelAxis ??= Math.abs(event.deltaX) > Math.abs(event.deltaY) ? 'horizontal' : 'vertical';
    clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => {
      const translated = wheelAxis === 'vertical';
      wheelTimer = 0;
      wheelAxis = undefined;
      track.style.removeProperty('scroll-snap-type');
      if (translated && !menu.hidden) goToPreview(selected);
    }, 180);
    // Horizontal gestures belong to the browser: preserve native inertia and snapping.
    if (wheelAxis === 'horizontal') return;
    event.preventDefault();
    // Vertical wheels need translation, but mandatory snap must not fight each tick.
    track.style.scrollSnapType = 'none';
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
    track.scrollBy({ left: event.deltaY * unit, behavior: 'instant' });
  }, { passive: false });
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : selected + (event.key === 'ArrowLeft' ? -1 : 1);
    const bounded = Math.max(0, Math.min(links.length - 1, index));
    goToPreview(bounded);
    links[bounded]?.focus({ preventScroll: true });
  });
  track.addEventListener('focusin', event => {
    const index = links.indexOf((event.target as Element).closest<HTMLAnchorElement>('.dock-preview')!);
    if (index >= 0) goToPreview(index);
  });
  menu.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('.dock-preview');
    if (!link) return;
    close();
    document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true });
  });
  document.addEventListener('pointerdown', event => {
    if (event.target instanceof Node && !nav.contains(event.target)) close();
  });
  // Safari does not focus buttons on pointer clicks; Escape must also work then.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { event.preventDefault(); close(true); }
  });
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget instanceof Node && !nav.contains(event.relatedTarget)) close();
    schedule();
  });
  nav.addEventListener('focusin', schedule);

  const update = () => {
    scrollFrame = 0;
    const y = window.scrollY;
    const progress = Math.max(0, y); // 20vh from the page top, independent of section geometry.
    const past = progress >= window.innerHeight * .2;
    // A closed picker must follow scroll position, even when its button retains
    // focus after a click or the pointer remains over the fixed dock.
    const visible = dockVisible({ progress, viewport: window.innerHeight, menuOpen: !menu.hidden });
    if (visible !== (nav.dataset.visible === 'true')) {
      if (!visible && nav.contains(document.activeElement)) hero.focus({ preventScroll: true });
      nav.dataset.visible = String(visible);
      nav.inert = !visible;
      if (visible) {
        // Show the complete dock at the threshold; don't spend its first appearance
        // as a collapsed logo that can disappear again during continuous scrolling.
        nav.dataset.expanded = 'true';
        trigger.inert = false;
        resume.inert = false;
      } else {
        close();
        if (!past) nav.dataset.expanded = 'false';
        trigger.inert = true;
        resume.inert = true;
      }
    }
    // A compact final section cannot always reach the usual reading line.
    const atEnd = y + window.innerHeight >= (document.documentElement?.scrollHeight ?? Infinity) - 2;
    const active = currentSection(sections.map(section => ({ id: section.id, label: section.dataset.navSection ?? '', top: section.getBoundingClientRect().top })), atEnd ? window.innerHeight : window.innerHeight * .35);
    if (active) {
      activeId = active.id;
      if (label.textContent !== active.label) label.textContent = active.label;
      if (menu.hidden) trigger.setAttribute('aria-label', `${active.label}, explore sections`);
      links.forEach(link => {
        if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  };
  function schedule() { if (!scrollFrame) scrollFrame = requestAnimationFrame(update); }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', () => {
    nav.dataset.visible = 'false'; // Restart a partially expanded dock restored from bfcache.
    schedule();
  });
  window.addEventListener('pagehide', () => {
    clearTimeout(wheelTimer);
    wheelTimer = 0;
    wheelAxis = undefined;
    track.style.removeProperty('scroll-snap-type');
    close();
    cancelAnimationFrame(previewFrame); cancelAnimationFrame(scrollFrame); scrollFrame = 0;
  });
  new ResizeObserver(schedule).observe(hero);
  update();
}
