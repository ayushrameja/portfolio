"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

function ExperienceRouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (!lenis) return;

    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    if (pathname.startsWith("/experience/")) {
      lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }

    previousPathname.current = pathname;
  }, [lenis, pathname]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <ExperienceRouteScrollReset />
      {children}
    </ReactLenis>
  );
}
