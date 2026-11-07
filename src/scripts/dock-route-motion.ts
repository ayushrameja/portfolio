import type { TransitionBeforePreparationEvent, TransitionBeforeSwapEvent } from 'astro:transitions/client';

export const DOCK_COLLAPSE_MS = 480;
export const DOCK_EXPAND_MS = 650;
const ease = 'cubic-bezier(.22,1,.36,1)';
let cancelMotion: (() => void) | undefined;
let departure: AbortSignal | undefined;

export function stopDockMotion() {
  cancelMotion?.();
  cancelMotion = undefined;
}

export function sameRoute(from: URL, to: URL) {
  const path = (url: URL) => url.pathname.replace(/\/+$/, '') || '/';
  return from.origin === to.origin && path(from) === path(to) && from.search === to.search;
}

async function animateDock(dock: HTMLElement, collapse: boolean, signal?: AbortSignal) {
  cancelMotion?.();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (signal?.aborted) return;
  if (reduced.matches || dock.dataset.visible !== 'true') {
    delete dock.dataset.routeCollapsed;
    return;
  }
  const logo = dock.querySelector<HTMLElement>('.dock-logo');
  if (!logo) return;
  const compact = logo.offsetWidth + (dock.clientLeft + parseFloat(getComputedStyle(dock).paddingLeft)) * 2;
  // Clear the compact arrival state to measure the responsive final width.
  dock.dataset.routeMotion = 'true';
  delete dock.dataset.routeCollapsed;
  const expanded = dock.getBoundingClientRect().width;
  const controls = [...dock.querySelectorAll<HTMLElement>('.dock-trigger, .dock-resume')];
  const duration = collapse ? DOCK_COLLAPSE_MS : DOCK_EXPAND_MS;
  const animations = [dock.animate([
    { width: `${collapse ? expanded : compact}px` },
    { width: `${collapse ? compact : expanded}px` },
  ], { duration, easing: ease, fill: 'both' })];
  for (const control of controls) {
    animations.push(control.animate(collapse
      ? [{ opacity: 1 }, { opacity: 0 }]
      : [{ opacity: 0 }, { opacity: 1 }], {
      duration: collapse ? 160 : 300, delay: collapse ? 0 : 220, fill: 'both', easing: ease,
    }));
  }
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
    animations.forEach(animation => animation.cancel());
    delete dock.dataset.routeMotion;
    delete dock.dataset.routeCollapsed;
  };
  cancelMotion = cancel;
  signal?.addEventListener('abort', cancel, { once: true });
  reduced.addEventListener('change', cancel, { once: true });
  await Promise.allSettled(animations.map(animation => animation.finished));
  if (!cancelled && collapse) dock.dataset.routeCollapsed = 'true';
  animations.forEach(animation => animation.cancel());
  if (!cancelled) delete dock.dataset.routeMotion;
  // A same-page click may abort navigation after collapse but before the swap.
  if (!collapse || cancelled) signal?.removeEventListener('abort', cancel);
  reduced.removeEventListener('change', cancel);
  if (cancelMotion === cancel) cancelMotion = undefined;
}

/** Fetch in parallel with the slow collapse; never delay loading the next page. */
export function prepareDockDeparture(event: TransitionBeforePreparationEvent) {
  cancelMotion?.();
  if (sameRoute(event.from, event.to)) return;
  departure = event.signal;
  const dock = document.querySelector<HTMLElement>('.bottom-nav');
  if (!dock) return;
  // An open section picker should not become part of the compact logo snapshot.
  dock.querySelector<HTMLElement>('.dock-panel')?.setAttribute('hidden', '');
  dock.dataset.open = 'false';
  const loader = event.loader;
  event.loader = async () => {
    try {
      await Promise.all([loader(), animateDock(dock, true, event.signal)]);
    } catch (error) {
      if (departure === event.signal) {
        stopDockMotion();
        delete dock.dataset.routeCollapsed;
      }
      throw error;
    } finally {
      if (departure === event.signal && (event.signal.aborted || event.defaultPrevented)) {
        stopDockMotion();
        delete dock.dataset.routeCollapsed;
      }
    }
  };
}

/** Wait for Astro's page transition so the live expansion isn't hidden behind a snapshot. */
export function finishDockArrival(event: TransitionBeforeSwapEvent) {
  if (departure === event.signal) departure = undefined;
  const dock = event.newDocument.querySelector<HTMLElement>('.bottom-nav');
  if (!dock || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  dock.dataset.routeCollapsed = 'true';
  const expand = () => {
    if (dock.isConnected && !event.signal.aborted) void animateDock(dock, false, event.signal);
    else delete dock.dataset.routeCollapsed;
  };
  void event.viewTransition.finished.then(expand, expand);
}
