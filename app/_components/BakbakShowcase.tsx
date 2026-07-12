"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, AudioLines, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BakbakShowcase() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="bakbak"
      className="relative scroll-mt-20 border-y journal-rule bg-[var(--paper-raised)] px-4 py-16 sm:px-8 sm:py-24"
    >
      <motion.div
        className="mx-auto w-full max-w-[88rem]"
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div variants={reveal} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/bakbak/icon.svg"
                alt=""
                width={46}
                height={46}
                className="h-[46px] w-[46px] rounded-[14px] shadow-[0_12px_28px_rgba(118,107,229,0.25)]"
              />
              <div>
                <p className="font-mono text-[10px] uppercase text-[#766be5] dark:text-[#a49cff]">
                  P1 / Independent product
                </p>
                <p className="mt-1 text-sm font-extrabold">Bakbak / Private beta</p>
              </div>
            </div>
            <h2 className="mt-7 max-w-[12ch] font-serif text-5xl font-medium leading-[0.96] sm:text-6xl lg:text-7xl">
              A small room for <span className="text-[#766be5] dark:text-[#a49cff]">big conversations.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={reveal}
            className="relative z-20 border-t journal-rule pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            <p className="max-w-xl text-lg font-bold leading-snug">
              Persistent chat, drop-in voice and video, and a synchronized
              soundboard for close friends.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
              Built as the opposite of public social media: invite-only, no
              discovery feed, and no pressure to perform for strangers.
            </p>
            <div className="relative z-20 mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/bakbak" className="journal-button pointer-events-auto cursor-pointer">
                Explore Bakbak
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/bakbak#download" className="journal-button-secondary pointer-events-auto cursor-pointer">
                Download
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={reveal}
          className="mt-12 grid overflow-hidden rounded-[8px] border border-white/10 bg-[#0f0e17] text-[#f7f5ff] shadow-[0_35px_90px_rgba(43,31,116,0.2)] lg:grid-cols-[0.72fr_1.28fr]"
        >
          <div className="bakbak-download-aside flex flex-col justify-between border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#a49cff]">
                Product note / 001
              </p>
              <p className="mt-6 max-w-[10ch] font-serif text-4xl leading-[0.98] sm:text-5xl">
                The group chat grew a front door.
              </p>
            </div>
            <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <p className="flex items-center gap-2 text-xs text-[#aaa7b8]">
                <MessageCircleMore className="h-4 w-4 text-[#a49cff]" />
                Persistent private chat
              </p>
              <p className="flex items-center gap-2 text-xs text-[#aaa7b8]">
                <AudioLines className="h-4 w-4 text-[#a49cff]" />
                Shared soundboard
              </p>
            </div>
          </div>

          <div className="p-2 sm:p-3">
            <Image
              src="/assets/bakbak/app-preview.jpg"
              alt="Bakbak desktop app preview using fictional room and member data"
              width={1309}
              height={818}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="h-full w-full rounded-[4px] border border-white/10 object-cover object-left-top"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
