"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LINKS } from "@/constants/links";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-x-clip px-6 py-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950" />
        <div
          className="absolute inset-0 opacity-[0.55] dark:opacity-[0.28]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute inset-0 bg-radial from-fuchsia-500/18 via-transparent to-transparent blur-3xl dark:from-fuchsia-400/10" />
        <div className="absolute right-[-20%] top-[-20%] h-[520px] w-[520px] rounded-full bg-radial from-violet-500/16 via-transparent to-transparent blur-3xl dark:from-violet-400/10" />
        <div className="absolute left-[-15%] bottom-[-25%] h-[560px] w-[560px] rounded-full bg-radial from-cyan-500/12 via-transparent to-transparent blur-3xl dark:from-cyan-400/8" />
        <div className="absolute inset-0 bg-linear-to-t from-white/85 via-transparent to-white/85 dark:from-zinc-950/90 dark:to-zinc-950/90" />
      </div>

      <motion.div
        className="mx-auto w-full max-w-6xl"
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center text-center">
          <motion.div variants={fadeInUp} className="w-full max-w-3xl">
            <div className="inline-flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-white/60 px-4 py-2 text-xs font-semibold tracking-widest text-zinc-700 backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200">
                PRODUCT · UI · SYSTEMS
              </span>
            </div>
            <h1 className="mt-8 text-6xl font-semibold tracking-tight text-zinc-950 sm:text-7xl dark:text-zinc-50">
              Ayush Rameja
              <span className="relative mt-4 block text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="bg-linear-to-r from-fuchsia-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-fuchsia-300 dark:via-violet-300 dark:to-cyan-300">
                  Software engineer
                </span>
                <span className="text-zinc-950 dark:text-zinc-50">
                  who ships end to end.
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-full h-px w-44 -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/70"
                />
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              I build web products across UI, APIs, and data. I try to keep the
              code clean, the UX calm, and the systems boring in the best way.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#projects"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-50 shadow-[0_20px_65px_-45px_rgba(0,0,0,0.45)] transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25 sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
              >
                See selected work
              </Link>
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-900 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25 sm:w-auto dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-50 dark:hover:bg-zinc-950/45"
              >
                Let&apos;s talk
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 w-full">
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="pointer-events-none absolute -inset-10 -z-10 opacity-70">
                <div className="absolute inset-0 rounded-[44px] bg-linear-to-br from-fuchsia-500/12 via-violet-500/8 to-cyan-500/12 blur-2xl dark:from-fuchsia-400/10 dark:via-violet-400/7 dark:to-cyan-400/9" />
              </div>

              <div className="overflow-hidden rounded-[40px] border border-zinc-200/70 bg-white/60 shadow-[0_26px_80px_-60px_rgba(0,0,0,0.22)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_26px_80px_-60px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between border-b border-zinc-200/70 bg-white/40 px-6 py-4 dark:border-zinc-700/60 dark:bg-zinc-950/25">
                  <div className="flex items-center gap-2" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                  </div>
                  <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
                    PORTFOLIO
                  </p>
                  <div className="w-[52px]" aria-hidden />
                </div>

                <div className="grid gap-0 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="p-6 text-left sm:p-8">
                      <div className="mt-5 overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/60 shadow-[0_18px_55px_-45px_rgba(0,0,0,0.18)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:shadow-[0_18px_55px_-45px_rgba(0,0,0,0.8)]">
                        <div className="relative h-[320px] w-full sm:h-[360px] lg:h-[420px]">
                          <Image
                            src="/assets/image/profile.png"
                            alt="Ayush Rameja"
                            fill
                            priority
                            className="object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/55 via-zinc-950/10 to-transparent dark:from-zinc-950/70" />

                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                            <div className="flex flex-wrap items-end justify-between gap-4">
                              <div className="min-w-0">
                                <p className="text-lg font-semibold text-zinc-50">
                                  Ayush Rameja
                                </p>
                                <p className="mt-1 text-sm text-zinc-200/90">
                                  <span className="font-semibold text-zinc-50">
                                    Software Engineer
                                  </span>{" "}
                                  at{" "}
                                  <Link
                                    href={LINKS.quarks}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-zinc-50 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/50"
                                  >
                                    Quarks
                                  </Link>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-200/70 lg:col-span-5 lg:border-l lg:border-t-0 dark:border-zinc-700/60">
                    <div className="flex h-full flex-col p-6 sm:p-8">
                      <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
                        QUICK LINKS
                      </p>
                      <div className="mt-5 grid gap-3">
                        <Link
                          href="/resume"
                          className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                        >
                          Resume
                          <span
                            className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400"
                            aria-hidden
                          >
                            ↗
                          </span>
                        </Link>
                        <Link
                          href="/blogs"
                          className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                        >
                          Blogs
                          <span
                            className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400"
                            aria-hidden
                          >
                            ↗
                          </span>
                        </Link>
                        <Link
                          href="#contact"
                          className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                        >
                          Contact
                          <span
                            className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400"
                            aria-hidden
                          >
                            ↗
                          </span>
                        </Link>
                      </div>
                      <div className="mt-8 rounded-3xl border border-zinc-200/70 bg-white/55 p-6 text-left backdrop-blur lg:mt-auto dark:border-zinc-700/60 dark:bg-zinc-950/20">
                        <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
                          WHAT I DO
                        </p>
                        <ul className="mt-4 grid gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                          <li className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500/80 dark:bg-fuchsia-400/70" />
                            Build clean, scalable frontends
                          </li>
                          <li className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500/70 dark:bg-violet-400/60" />
                            Ship APIs and services that hold up
                          </li>
                          <li className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70 dark:bg-cyan-400/60" />
                            Keep performance and DX honest
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10">
            <button
              type="button"
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({
                  behavior: "smooth",
                })}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-zinc-200/70 bg-white/65 px-5 py-2.5 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200 dark:hover:bg-zinc-950/45"
            >
              Scroll
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 text-zinc-700 transition group-hover:translate-y-0.5 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200">
                ↓
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
