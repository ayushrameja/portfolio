"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useLenis } from "lenis/react";
import Image from "next/image";

import { profile } from "@/utils/profileData";
import { scrollToTarget } from "@/utils/scroll";

export default function HeroSection() {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const reveal = reducedMotion
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section id="cover" className="relative px-4 pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-8">
      <div className="mx-auto w-full max-w-[88rem]">
        <motion.header
          className="flex items-center justify-between gap-4 border-y journal-rule py-2.5 sm:py-3"
          {...reveal}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] uppercase text-[var(--muted)] sm:text-xs">
            {profile.name} / {profile.edition}
          </p>
          <p className="hidden font-mono text-[10px] uppercase text-[var(--muted)] lg:block lg:text-xs">
            {profile.location} / 12.9716 N, 77.5946 E
          </p>
          <p className="font-mono text-[10px] uppercase text-[var(--vermilion)] sm:text-xs">
            Issue 01
          </p>
        </motion.header>

        <div className="grid gap-5 py-5 sm:gap-7 sm:py-9 lg:grid-cols-12 lg:items-end lg:gap-10">
          <motion.div
            className="lg:col-span-8"
            {...reveal}
            transition={{ delay: 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="journal-kicker">{profile.title}</p>
            <h1 className="mt-3 max-w-[12ch] font-serif text-[2.65rem] font-medium leading-[0.94] sm:mt-4 sm:text-6xl lg:text-[5.75rem] xl:text-[6.5rem]">
              I build the systems behind <span className="text-[var(--cobalt)]">ambitious products.</span>
            </h1>
          </motion.div>

          <motion.aside
            className="border-t journal-rule pt-4 sm:pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
            {...reveal}
            transition={{ delay: 0.18, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 font-mono text-xs text-[var(--vermilion)]">
              <span className="h-2 w-2 bg-[var(--vermilion)]" aria-hidden />
              {profile.currentRole.label}
            </div>
            <p className="mt-3 text-lg font-bold leading-snug">
              {profile.currentRole.role} at {profile.currentRole.company}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--muted)]">
              {profile.currentRole.note}
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)] sm:mt-5 sm:text-base sm:leading-7">
              {profile.intro}
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={() => scrollToTarget("work", lenis ?? undefined)}
                className="journal-button cursor-pointer"
              >
                {profile.ctas.work}
                <ArrowDownRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToTarget("notes", lenis ?? undefined)}
                className="journal-button-secondary cursor-pointer"
              >
                {profile.ctas.notes}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.aside>
        </div>

        <motion.figure
          className="border-y journal-rule"
          initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
          transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid sm:grid-cols-[minmax(0,1fr)_220px]">
            <div className="relative h-32 overflow-hidden sm:h-48 lg:h-[clamp(18rem,28svh,22rem)]">
              <Image
                src="/assets/image/profile-pic.png"
                alt="Ayush Rameja"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 80vw"
                className="object-cover object-[center_44%] saturate-[0.88] contrast-[1.04]"
              />
              <span className="absolute inset-y-0 left-0 w-2 bg-[var(--cobalt)]" aria-hidden />
            </div>
            <figcaption className="hidden flex-col justify-between border-t journal-rule bg-[var(--paper-raised)] p-4 sm:flex sm:border-l sm:border-t-0 sm:p-5">
              <p className="journal-meta">Portrait / Bangalore / Current edition</p>
              <div className="mt-4">
                <p className="font-serif text-2xl leading-tight">Engineering from interface to infrastructure.</p>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                  React, Next.js, Node.js, AWS, distributed workflows, and product delivery.
                </p>
              </div>
            </figcaption>
          </div>
        </motion.figure>

        <p className="absolute bottom-1 right-4 font-mono text-[9px] uppercase text-[var(--vermilion)] lg:hidden">
          Next / 01.1 Autodesk
        </p>
      </div>
    </section>
  );
}
