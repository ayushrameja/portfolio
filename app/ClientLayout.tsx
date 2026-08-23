"use client";

import { MotionConfig } from "framer-motion";

import Nav from "@/components/Nav";
import PaletteObserver from "@/components/PaletteObserver";
import SmoothScroll from "@/components/SmoothScroll";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Nav />
        <PaletteObserver />
        <div id="main-content" tabIndex={-1} className="site-page-shell">
          {children}
        </div>
      </SmoothScroll>
    </MotionConfig>
  );
}
