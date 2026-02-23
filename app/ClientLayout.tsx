"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, Suspense } from "react";

import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { useAppStore } from "@/store/store";
import { triggerStorm } from "@/utils/storm";
import { Toaster } from "@/components/ui/sonner";
import StormTransition from "@/components/StormTransition";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hasMounted = useRef(false);
  const setCurrentRoute = useAppStore((state) => state.setCurrentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);

  useLayoutEffect(() => {
    let route = "Home";
    if (pathname.includes("/blogs")) {
      route = "Blogs";
    } else if (pathname.includes("/resume")) {
      route = "Resume";
    }

    setCurrentRoute(route);
    setShowExternal(false);
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      triggerStorm({ cause: "route" });
    }
  }, [pathname, setCurrentRoute, setShowExternal]);

  return (
    <SmoothScroll>
      <div className="relative">
        <div className="relative" id="app-shell">
          <Suspense fallback={<LoadingSpinner />}>
            <div id="page-shell">{children}</div>
          </Suspense>
        </div>
        <Nav />
        <Toaster />
        <StormTransition />
      </div>
    </SmoothScroll>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}
