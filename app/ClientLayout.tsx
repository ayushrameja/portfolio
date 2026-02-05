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
  const previousPathname = useRef<string | null>(null);
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

    const isBlogPost = pathname.startsWith("/blogs/") && pathname !== "/blogs";
    const wasBlogPost = previousPathname.current?.startsWith("/blogs/") && previousPathname.current !== "/blogs";
    const isWithinBlogPosts = isBlogPost && wasBlogPost;

    if (!hasMounted.current) {
      hasMounted.current = true;
      setTimeout(() => triggerStorm({ cause: "load" }), 100);
    } else if (!isWithinBlogPosts) {
      triggerStorm({ cause: "route" });
    }

    previousPathname.current = pathname;
  }, [pathname, setCurrentRoute, setShowExternal]);

  return (
    <div className="relative">
      <div className="relative" id="app-shell">
        <Suspense fallback={<LoadingSpinner />}>
          {children}
          <Nav />
        </Suspense>
      </div>
      <Toaster />
      <StormTransition />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}
