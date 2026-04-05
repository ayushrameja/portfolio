'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

import { RESUME } from '@/constants/links';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
      staggerChildren: 0.08,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

export default function ResumeContent() {
  return (
    <motion.main
      className="min-h-dvh bg-zinc-50 text-zinc-950 dark:bg-[#1a1a1a] dark:text-zinc-50 lg:h-dvh lg:overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto grid min-h-dvh max-w-[1800px] lg:grid-cols-[360px_minmax(0,1fr)]">
        <motion.aside
          variants={sectionVariants}
          className="flex flex-col border-b border-zinc-200/80 px-6 py-8 dark:border-zinc-800 sm:px-8 lg:h-dvh lg:border-b-0 lg:border-r lg:px-10 lg:py-10"
        >
          <div className="flex flex-1 flex-col">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <span aria-hidden>←</span>
              <span>Back to portfolio</span>
            </Link>

            <div className="mt-12 max-w-xs">
              <h1 className="font-editorial text-5xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-6xl">
                Resume
              </h1>
              <p className="mt-5 text-lg leading-9 text-zinc-600 dark:text-zinc-300">
                A chronological overview of my work history, skills, and
                technical experience.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={RESUME.downloadUrl}
                download
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)] transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.85)] dark:hover:bg-white"
              >
                <span>Download PDF</span>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.aside>

        <motion.section
          variants={sectionVariants}
          className="bg-zinc-100/70 dark:bg-[#202020] lg:h-dvh lg:overflow-hidden"
        >
          <div className="flex h-[72dvh] min-h-[560px] w-full flex-col overflow-hidden lg:h-full">
            <div className="flex-1">
              <iframe
                src={RESUME.previewUrl}
                title="Ayush Rameja's Resume"
                className="h-full w-full border-0 bg-white"
                loading="lazy"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
