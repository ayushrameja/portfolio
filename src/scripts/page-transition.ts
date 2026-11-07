import type { TransitionDirectionalAnimations } from 'astro';
import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

const pair = {
  old: { name: 'page-leave', duration: '150ms', easing: 'cubic-bezier(.4,0,1,1)', fillMode: 'both' },
  new: { name: 'page-enter', duration: '320ms', easing: 'cubic-bezier(.22,1,.36,1)', fillMode: 'both' },
};

// Astro compiles this for both native transitions and its CSS fallback.
export const pageTransition: TransitionDirectionalAnimations = { forwards: pair, backwards: pair };

export function preparePageSwap(event: TransitionBeforeSwapEvent) {
  const root = event.newDocument.documentElement;
  root.dataset.clientNavigation = 'true';
  root.classList.remove('intro-pending', 'intro-playing');
  event.newDocument.getElementById('site-shell')?.removeAttribute('inert');
  event.newDocument.getElementById('intro')?.setAttribute('hidden', '');
  // Preserve the incoming dock's default visibility. Home's scroll handler
  // reveals it only when the restored position is past the scroll threshold.
}
