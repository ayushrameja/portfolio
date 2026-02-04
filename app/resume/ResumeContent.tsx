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
      },
    },
  };

  const iframeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className="min-h-dvh px-6 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Resume</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">Preview below. You can also download the PDF.</p>
          </div>
          <a
            href={RESUME.downloadUrl}
            download
            className="inline-flex w-fit items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-50 transition hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
          >
            Download PDF
          </a>
        </div>

        <motion.div
          variants={iframeVariants}
          className="overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/70 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
        >
          <iframe
            src={RESUME.previewUrl}
            title="Ayush Rameja's Resume"
            className="h-[75dvh] w-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
