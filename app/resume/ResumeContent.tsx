"use client";

import { motion } from "framer-motion";
import { RESUME } from "@/constants/links";

export default function ResumeContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const iframeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="min-h-dvh bg-zinc-50 px-4 pt-12 pb-28 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 sm:px-6 lg:h-dvh lg:overflow-hidden lg:px-8 lg:pt-8 lg:pb-28"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-[1200px] lg:h-full">
        <div className="flex flex-col gap-10 lg:grid lg:h-full lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col gap-8 lg:justify-between lg:py-2">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Career Snapshot
              </p>
              <h1 className="font-editorial text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl">
                Resume
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                A chronological overview of my work history, skills, and
                technical experience.
              </p>
              <a
                href={RESUME.downloadUrl}
                download
                className="group mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold tracking-wide uppercase text-white transition-all hover:bg-zinc-700 hover:shadow-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <span>Download PDF</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                >
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
              </a>
            </div>
          </div>

          <motion.div
            variants={iframeVariants}
            className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 lg:h-full"
          >
            <div className="absolute inset-x-0 top-0 flex h-10 items-center gap-2 border-b border-zinc-100 bg-zinc-50/50 px-4 dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <iframe
              src={RESUME.previewUrl}
              title="Ayush Rameja's Resume"
              className="mt-10 h-[72dvh] w-full lg:h-[calc(100%-2.5rem)]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
