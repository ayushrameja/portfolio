type SectionPosition = { id: string; label: string; top: number };

export function currentSection(sections: SectionPosition[], activationLine: number) {
  return sections.reduce<SectionPosition | undefined>((active, section) =>
    section.top <= activationLine ? section : active, sections[0]);
}

export function nearestPreview(centers: number[], viewportCenter: number) {
  return centers.reduce((best, center, index) =>
    Math.abs(center - viewportCenter) < Math.abs(centers[best] - viewportCenter) ? index : best, 0);
}

export function previewScale(width: number, height: number, availableWidth: number, availableHeight: number) {
  return Math.min(availableWidth / Math.max(1, width), availableHeight / Math.max(1, height));
}

export function setupBottomNav() {
  const nav = document.querySelector<HTMLElement>(".bottom-nav");
  const hero = document.querySelector<HTMLElement>(".hero-frame");
  const trigger = nav?.querySelector<HTMLButtonElement>(".dock-trigger");
  const menu = nav?.querySelector<HTMLElement>(".dock-panel");
  const label = nav?.querySelector<HTMLElement>(".dock-label");
  const track = nav?.querySelector<HTMLElement>(".dock-track");
  const resume = nav?.querySelector<HTMLElement>(".dock-resume");
  if (!nav || !hero || !trigger || !menu || !label || !track || !resume) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
  const links = Array.from(track.querySelectorAll<HTMLAnchorElement>(".dock-preview"));
  const previous = nav.querySelector<HTMLButtonElement>(".dock-prev")!;
  const next = nav.querySelector<HTMLButtonElement>(".dock-next")!;
  const count = nav.querySelector<HTMLElement>(".dock-count")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let selected = 0;
  let activeId = "selected-work";
  let enterTimer: ReturnType<typeof setTimeout> | undefined;
  let previewFrame = 0;

  // A frozen, inert miniature of the current responsive layout, with no duplicate
  // IDs, scripts, live navigation, or recursively embedded dock. Long sections
  // intentionally show their first viewport, like a section landing preview.
  const renderPreviews = () => {
    links.forEach(link => {
      const source = link.dataset.section === "home" ? hero : document.getElementById(link.dataset.section!);
      const page = link.querySelector<HTMLElement>(".dock-preview-page")!;
      if (!source) return;
      const width = source.offsetWidth;
      const height = Math.min(source.offsetHeight, window.innerHeight);
      const scale = previewScale(width, height, page.clientWidth, page.clientHeight);
      const cached = page.querySelector<HTMLElement>(".dock-preview-viewport");
      if (cached && cached.dataset.sourceSize === `${width}:${height}`) {
        cached.style.width = `${width * scale}px`;
        cached.style.height = `${height * scale}px`;
        cached.querySelector<HTMLElement>(".dock-preview-root")!.style.transform = `scale(${scale})`;
        return;
      }
      const clone = source.cloneNode(true) as HTMLElement;
      clone.querySelectorAll("script, style, .bottom-nav, .hero-menu").forEach(node => node.remove());
      [clone, ...Array.from(clone.querySelectorAll<HTMLElement>("*"))].forEach(node => {
        ["id", "data-nav-section", "data-card", "aria-labelledby", "aria-controls", "popovertarget", "autofocus"].forEach(attribute => node.removeAttribute(attribute));
        if (node instanceof HTMLImageElement) node.loading = "eager";
        if (node instanceof HTMLAnchorElement) node.removeAttribute("href");
      });
      clone.classList.remove("is-ready", "is-live");
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      const viewport = document.createElement("div");
      viewport.dataset.sourceSize = `${width}:${height}`;
      viewport.className = "dock-preview-viewport";
      viewport.style.width = `${width * scale}px`;
      viewport.style.height = `${height * scale}px`;
      const root = document.createElement("div");
      root.className = "dock-preview-root";
      root.style.width = `${width}px`;
      root.style.transform = `scale(${scale})`;
      // Freeze the same palette shown on the real hero.
      const computed = getComputedStyle(hero);
      for (const role of ["colorX", "top", "bottom", "ink", "muted", "accent", "secondary", "line", "marquee", "paper"]) {
        clone.style.setProperty(`--hero-${role}`, computed.getPropertyValue(`--hero-${role}`));
      }
      root.append(clone);
      viewport.append(root);
      page.replaceChildren(viewport);
    });
  };
  const reflectSelection = (index: number) => {
    selected = index;
    links.forEach((link, i) => { link.dataset.selected = String(i === index); });
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(links.length).padStart(2, "0")}`;
    previous.disabled = index === 0;
    next.disabled = index === links.length - 1;
  };
  const goToPreview = (index: number, smooth = true) => {
    const target = links[Math.max(0, Math.min(links.length - 1, index))];
    if (!target) return;
    const left = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
    track.scrollTo({ left, behavior: smooth && !reduced.matches ? "smooth" : "instant" });
    reflectSelection(links.indexOf(target));
  };
  const close = (restoreFocus = false) => {
    cancelAnimationFrame(previewFrame);
    menu.hidden = true;
    nav.dataset.open = "false";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-label", `${label.textContent}, explore sections`);
    if (restoreFocus) trigger.focus({ preventScroll: true });
  };
  trigger.addEventListener("click", () => {
    if (!menu.hidden) { close(); return; }
    menu.hidden = false;
    nav.dataset.open = "true";
    trigger.setAttribute("aria-expanded", "true");
    trigger.setAttribute("aria-label", "Close section previews");
    previewFrame = requestAnimationFrame(() => {
      renderPreviews();
      goToPreview(Math.max(0, links.findIndex(link => link.dataset.section === activeId)), false);
    });
  });
  // Dock width changes during opening; refit miniatures and preserve the selected card.
  const previewObserver = new ResizeObserver(() => {
    if (menu.hidden) return;
    cancelAnimationFrame(previewFrame);
    previewFrame = requestAnimationFrame(() => { renderPreviews(); goToPreview(selected, false); });
  });
  previewObserver.observe(track);
  track.addEventListener("scroll", () => {
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    reflectSelection(nearestPreview(links.map(link => {
      const rect = link.getBoundingClientRect();
      return rect.left + rect.width / 2;
    }), center));
  }, { passive: true });
  track.addEventListener("wheel", event => {
    if (event.ctrlKey) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1;
    track.scrollBy({ left: delta * unit, behavior: "instant" });
  }, { passive: false });
  previous.addEventListener("click", () => goToPreview(selected - 1));
  next.addEventListener("click", () => goToPreview(selected + 1));
  track.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : selected + (event.key === "ArrowLeft" ? -1 : 1);
    const bounded = Math.max(0, Math.min(links.length - 1, index));
    goToPreview(bounded);
    links[bounded]?.focus({ preventScroll: true });
  });
  track.addEventListener("focusin", event => {
    const index = links.indexOf((event.target as Element).closest<HTMLAnchorElement>(".dock-preview")!);
    if (index >= 0) goToPreview(index);
  });
  menu.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>(".dock-preview");
    if (!link) return;
    close();
    document.getElementById(link.hash.slice(1))?.focus({ preventScroll: true });
  });
  document.addEventListener("pointerdown", event => {
    if (event.target instanceof Node && !nav.contains(event.target)) close();
  });
  nav.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) { event.preventDefault(); close(true); }
  });
  nav.addEventListener("focusout", event => {
    // Disabled edge controls and native scrolling can temporarily clear focus.
    if (event.relatedTarget instanceof Node && !nav.contains(event.relatedTarget)) close();
  });
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const visible = hero.getBoundingClientRect().bottom <= 0;
    if (visible !== (nav.dataset.visible === "true")) {
      clearTimeout(enterTimer);
      nav.dataset.visible = String(visible);
      nav.inert = !visible;
      if (visible) {
        const expand = () => {
          nav.dataset.expanded = "true";
          trigger.inert = false;
          resume.inert = false;
        };
        if (reduced.matches) expand();
        else enterTimer = setTimeout(expand, 360);
      } else {
        if (nav.contains(document.activeElement)) document.getElementById("home")?.focus({ preventScroll: true });
        close();
        nav.dataset.expanded = "false";
        trigger.inert = true;
        resume.inert = true;
      }
    }
    const active = currentSection(sections.map(section => ({ id: section.id, label: section.dataset.navSection ?? "", top: section.getBoundingClientRect().top })), window.innerHeight * 0.35);
    if (active) {
      activeId = active.id;
      label.textContent = active.label;
      if (menu.hidden) trigger.setAttribute("aria-label", `${active.label}, explore sections`);
      links.forEach(link => {
        if (link.hash === `#${active.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => { schedule(); if (!menu.hidden) renderPreviews(); });
  window.addEventListener("pageshow", schedule);
  new ResizeObserver(schedule).observe(hero);
  update();
}
