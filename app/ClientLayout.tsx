"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect, Suspense } from "react";

import Nav from "@/components/Nav";
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

  useEffect(() => {
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
      triggerStorm({ cause: "load" });
    } else {
      triggerStorm({ cause: "route" });
    }
  }, [pathname, setCurrentRoute, setShowExternal]);

  return (
    <div className="relative">
      <div className="relative" id="app-shell">
        <Suspense fallback={null}>
          {children}
          <Nav />
        </Suspense>
      </div>
      <Toaster />
      <StormTransition />
    </div>
  );
}
