"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, Suspense } from "react";

import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { triggerJournalTransition } from "@/utils/storm";
import { Toaster } from "@/components/ui/sonner";
import JournalBackground from "@/components/JournalBackground";
import JournalTransition from "@/components/JournalTransition";

function getRouteChapter(pathname: string) {
  if (pathname === "/bakbak") return { number: "P1", label: "Bakbak" };
  if (pathname.startsWith("/experience/autodesk")) return { number: "01.1", label: "Autodesk" };
  if (pathname.startsWith("/experience/siemens")) return { number: "01.2", label: "Siemens" };
  if (pathname.startsWith("/experience/accenture")) return { number: "01.3", label: "Accenture" };
  if (pathname.startsWith("/blogs/")) return { number: "02", label: "Field Note" };
  if (pathname === "/blogs") return { number: "02", label: "Field Notes" };
  if (pathname === "/resume") return { number: "03", label: "Resume" };
  return { number: "00", label: "Cover" };
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    console.log("Made with love by Ayush Rameja & Codex");
  }, []);

  useLayoutEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    } else {
      triggerJournalTransition({ cause: "route", ...getRouteChapter(pathname) });
    }
  }, [pathname]);

  return (
    <SmoothScroll>
      <div className="relative min-h-dvh">
        <JournalBackground />
        <div className="relative z-10" id="app-shell">
          <Suspense fallback={<LoadingSpinner />}>
            <div id="page-shell" className="relative">{children}</div>
          </Suspense>
        </div>
        <Nav />
        <Toaster />
        <JournalTransition />
      </div>
    </SmoothScroll>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--paper)]">
      <p className="font-mono text-xs uppercase text-[var(--muted)]">Opening journal...</p>
    </div>
  );
}
