"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { LINKS } from "@/constants/links";
import { useContactForm } from "@/hooks/useContactForm";

export default function ContactSection() {
  const { formState, isSubmitting, isSubmitted, submittedName, updateField, handleSubmit, reset } = useContactForm();

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-cover bg-center shadow-[0_28px_90px_-70px_rgba(0,0,0,0.25)] dark:border-zinc-700/60 dark:shadow-[0_28px_90px_-70px_rgba(0,0,0,0.9)]">
          <div className="absolute inset-0 bg-linear-to-tr from-white/92 via-white/70 to-white/40 dark:from-zinc-950/90 dark:via-zinc-950/60 dark:to-zinc-950/25" />
          <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-70">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/16 blur-3xl dark:bg-fuchsia-400/12" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-violet-500/14 blur-3xl dark:bg-violet-400/10" />
          </div>

          <div className="relative p-8 md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-300/80">CONTACT</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Ping me <span className="text-fuchsia-700 dark:text-fuchsia-200">let&apos;s build something</span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-200/85">
                Short message is perfect. I usually reply fast (assuming Slack isn&apos;t on fire).
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
              <div className="lg:col-span-7">
                <div className="h-full rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.18)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.85)]">
                  {isSubmitted ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 shadow-[0_18px_50px_-38px_rgba(0,0,0,0.25)] dark:border-zinc-700/60 dark:bg-zinc-950/45 dark:shadow-[0_18px_50px_-38px_rgba(0,0,0,0.85)]">
                        <CheckCircle2 className="h-7 w-7 text-fuchsia-600 dark:text-fuchsia-300" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Message sent
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-200/85">
                        {submittedName ? `Thanks, ${submittedName}. ` : null}
                        I got your note and I&apos;ll reply soon.
                      </p>
                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <button
                          type="button"
                          onClick={reset}
                          className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_-38px_rgba(0,0,0,0.45)] transition enabled:cursor-pointer enabled:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/30 dark:bg-zinc-100 dark:text-zinc-950 dark:shadow-[0_18px_55px_-38px_rgba(0,0,0,0.8)] dark:enabled:hover:bg-white dark:focus-visible:ring-fuchsia-400/30"
                        >
                          Send another
                        </button>
                        <Link
                          href={`mailto:${LINKS.email}`}
                          className="inline-flex items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:hover:bg-zinc-950/55"
                        >
                          Email instead
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          required
                          placeholder="Your name"
                          className="mt-2 w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                          placeholder="you@domain.com"
                          className="mt-2 w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          value={formState.message}
                          onChange={(e) => updateField("message", e.target.value)}
                          required
                          placeholder="What are you building, and what do you need help with?"
                          className="mt-2 h-36 w-full resize-none rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-zinc-600 dark:text-zinc-300/80">
                          Prefer email?{" "}
                          <Link
                            href={`mailto:${LINKS.email}`}
                            className="font-semibold text-zinc-950 underline decoration-zinc-900/15 underline-offset-4 transition hover:decoration-zinc-900/35 dark:text-zinc-50 dark:decoration-white/20 dark:hover:decoration-white/50"
                          >
                            {LINKS.email}
                          </Link>
                        </p>
                        <button
                          type="submit"
                          disabled={isSubmitting || isSubmitted}
                          className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_-38px_rgba(0,0,0,0.45)] transition enabled:cursor-pointer enabled:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-950 dark:shadow-[0_18px_55px_-38px_rgba(0,0,0,0.8)] dark:enabled:hover:bg-white dark:focus-visible:ring-fuchsia-400/30"
                        >
                          {isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : "Send"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="grid gap-8 lg:col-span-5">
                <div className="rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.16)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.8)]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Links</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300/85">
                    Stalk professionally. Please do not open a Jira ticket about my personality.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Link
                      href={`mailto:${LINKS.email}`}
                      className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      <span>Mail</span>
                      <span
                        className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                        aria-hidden
                      >
                        ↗
                      </span>
                    </Link>
                    <Link
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      <span>LinkedIn</span>
                      <span
                        className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                        aria-hidden
                      >
                        ↗
                      </span>
                    </Link>
                    <Link
                      href={LINKS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                    >
                      <span>GitHub</span>
                      <span
                        className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200"
                        aria-hidden
                      >
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.16)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.8)]">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">What I&apos;m Great At</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-800 dark:border-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-100">
                      Shipping UI polish
                    </span>
                    <span className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-200">
                      Product-minded engineering
                    </span>
                    <span className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-200">
                      Performance & DX
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
