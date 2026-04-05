"use client";

import { motion } from "framer-motion";

import type { ExperienceTheme } from "@/lib/experienceThemes";

type ExperienceAmbientProps = {
  theme: ExperienceTheme;
};

export default function ExperienceAmbient({ theme }: ExperienceAmbientProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className={`absolute -left-[20%] top-[-10%] h-[min(480px,55vw)] w-[min(480px,55vw)] rounded-full ${theme.page.ambientA}`}
        animate={{ x: [0, 28, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute -right-[15%] top-[15%] h-[min(400px,48vw)] w-[min(400px,48vw)] rounded-full ${theme.page.ambientB}`}
        animate={{ x: [0, -20, 0], y: [0, 24, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className={`absolute bottom-[-20%] left-[25%] h-[min(360px,45vw)] w-[min(360px,45vw)] rounded-full ${theme.page.ambientC}`}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}
