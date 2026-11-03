import { navigate } from 'astro:transitions/client';
import { sameRoute, stopDockMotion } from './dock-route-motion';

/** Same-page links always use Astro's hash-only path, including bare home links. */
export function handleSectionNavigation(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.composedPath().find(node => node instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;
  if (!link?.href || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
  const current = new URL(location.href);
  const target = new URL(link.href);
  if (!sameRoute(current, target)) return;
  event.preventDefault();
  stopDockMotion();
  target.pathname = current.pathname;
  target.hash ||= document.getElementById('home') ? '#home' : '#content';
  // Let the router own history/scroll restoration without fetching or swapping DOM.
  void navigate(target.href, { sourceElement: link });
}
