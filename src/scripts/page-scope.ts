/** Resources owned by one rendered page, released before Astro replaces it. */
export function createPageScope() {
  const cleanups: (() => void)[] = [];
  const listeners: (() => void)[] = [];
  let disposed = false;
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    document.removeEventListener('astro:before-swap', dispose);
    // Remove listeners before cancelling effects that can themselves emit events.
    for (const remove of listeners.splice(0)) remove();
    for (const cleanup of cleanups.splice(0).reverse()) cleanup();
  };
  document.addEventListener('astro:before-swap', dispose, { once: true });
  return {
    dispose,
    add(cleanup: () => void) { cleanups.push(cleanup); },
    listen<K extends keyof (WindowEventMap & DocumentEventMap)>(
      target: EventTarget | null | undefined,
      type: K,
      listener: (event: (WindowEventMap & DocumentEventMap)[K]) => void,
      options?: AddEventListenerOptions,
    ) {
      if (!target) return;
      target.addEventListener(type, listener as EventListener, options);
      listeners.push(() => target.removeEventListener(type, listener as EventListener, options));
    },
    observe<T extends { disconnect(): void }>(observer: T): T {
      cleanups.push(() => observer.disconnect());
      return observer;
    },
  };
}
