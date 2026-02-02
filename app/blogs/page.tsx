"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    document.title = "Blogs: Ayush Rameja";
  }, []);

  return (
    <motion.div
      className="min-h-dvh px-6 py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="rounded-3xl border border-zinc-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Blogs</h1>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">Writing in progress — check back soon.</p>
            </div>
            <div className="hidden sm:block rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/30 dark:text-zinc-300">
              Coming soon
            </div>
          </div>

          <div className="mt-10 grid place-items-center rounded-2xl border border-dashed border-zinc-200/70 bg-zinc-950/5 p-10 text-center dark:border-zinc-700/60 dark:bg-zinc-950/20">
            <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              No blogs yet
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 max-w-md text-zinc-600 dark:text-zinc-300">
              I&apos;m polishing a few posts before publishing. If you have a topic suggestion, ping me via the contact
              section on the homepage.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
