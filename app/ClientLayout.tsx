"use client";

import { useEffect, Suspense, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/store";
import Nav from "@/components/Nav";
import StormTransition from "@/components/StormTransition";
import { triggerStorm } from "@/utils/storm";
import { Toaster } from "@/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const setNavClass = useAppStore((state) => state.setNavClass);
  const setCurrentRoute = useAppStore((state) => state.setCurrentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);
  const hasMounted = useRef(false);

  useEffect(() => {
    let route = "Home";
    if (pathname.includes("/blogs")) {
      route = "Blogs";
    } else if (pathname.includes("/resume")) {
      route = "Resume";
    }

    setNavClass("grey");
    setCurrentRoute(route);
    setShowExternal(false);
    if (!hasMounted.current) {
      hasMounted.current = true;
      triggerStorm({ cause: "load" });
    } else {
      triggerStorm({ cause: "route" });
    }
  }, [pathname, setCurrentRoute, setNavClass, setShowExternal]);

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
