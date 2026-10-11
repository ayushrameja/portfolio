"use client";

import { MotionConfig } from "framer-motion";
import Nav from "@/components/Nav";
import PlayfulEffects from "@/components/portfolio/PlayfulEffects";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
      <PlayfulEffects />
    </MotionConfig>
  );
}
