"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function RouteScrollReset({ nativeOnly = false }: { nativeOnly?: boolean }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!lenis && !nativeOnly) return;

    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    previousPathname.current = pathname;

    let frame = 0;
    let retry = 0;
    const hash = window.location.hash;
    const restoreScroll = () => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return;
        if (lenis) {
          lenis.scrollTo(target, {
            immediate: true,
            force: true,
            offset: -84,
          });
        } else {
          const top = window.scrollY + target.getBoundingClientRect().top - 84;
          window.scrollTo(0, top);
        }
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    };

    frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(restoreScroll);
    });
    retry = window.setTimeout(restoreScroll, 180);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(retry);
    };
  }, [lenis, nativeOnly, pathname]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);

    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) {
    return (
      <>
        <RouteScrollReset nativeOnly />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: { offset: -84 },
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
