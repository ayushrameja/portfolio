"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";

import { LINKS } from "@/constants/links";
import { useContactForm } from "@/hooks";

const contactLinks = [
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
  { label: "LinkedIn", value: "ayushrameja", href: LINKS.linkedin },
  { label: "GitHub", value: "ayushrameja", href: LINKS.github },
] as const;

function FormSkeleton() {
  return (
    <div className="space-y-8" aria-hidden>
      <div className="h-12 animate-pulse border-b journal-rule" />
      <div className="h-12 animate-pulse border-b journal-rule" />
      <div className="h-32 animate-pulse border-b journal-rule" />
    </div>
  );
}

export default function ContactSection() {
  const {
    formState,
    isSubmitting,
    isSubmitted,
    submittedName,
    updateField,
    handleSubmit,
    reset,
  } = useContactForm();
  const [formMounted, setFormMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setFormMounted(true));
  }, []);

  return (
    <section id="correspondence" className="relative px-4 py-16 sm:px-8 sm:py-24">
      <motion.div
        className="mx-auto w-full max-w-[88rem]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="grid gap-7 border-b journal-rule pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="journal-kicker">04 / Correspondence</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-[16ch] font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
              Have a difficult system to make simpler? <span className="text-[var(--vermilion)]">Write to me.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-0 lg:py-14">
          <aside className="lg:col-span-4 lg:border-r lg:pr-10 journal-rule">
            <p className="max-w-sm text-base leading-7 text-[var(--muted)]">
              A short note is perfect. Tell me what you are building, what is currently stubborn, and where you think I can help.
            </p>

            <div className="mt-9 border-t journal-rule">
              {contactLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-5 border-b journal-rule py-4"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase text-[var(--faint)]">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold group-hover:text-[var(--cobalt)]">{item.value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition group-hover:text-[var(--cobalt)]" />
                </Link>
              ))}
            </div>

            <p className="mt-8 font-serif text-2xl leading-snug">
              No Jira ticket required. A surprisingly humane workflow.
            </p>
          </aside>

          <div className="lg:col-span-8 lg:pl-12">
            {isSubmitted ? (
              <div className="flex min-h-[28rem] flex-col justify-center border-y journal-rule py-12">
                <CheckCircle2 className="h-9 w-9 text-[var(--cobalt)]" />
                <h3 className="mt-6 font-serif text-4xl sm:text-5xl">Message received.</h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-[var(--muted)]">
                  {submittedName ? `Thank you, ${submittedName}. ` : "Thank you. "}
                  Your note made it through and I will reply soon.
                </p>
                <button type="button" onClick={reset} className="journal-button-secondary mt-8 w-fit cursor-pointer">
                  Send another note
                </button>
              </div>
            ) : formMounted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="block font-mono text-[10px] uppercase text-[var(--muted)]" htmlFor="name">
                    01 / Your name
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Name"
                      className="journal-input mt-2 font-sans text-base normal-case"
                    />
                  </label>
                  <label className="block font-mono text-[10px] uppercase text-[var(--muted)]" htmlFor="email">
                    02 / Your email
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@domain.com"
                      className="journal-input mt-2 font-sans text-base normal-case"
                    />
                  </label>
                </div>

                <label className="block font-mono text-[10px] uppercase text-[var(--muted)]" htmlFor="message">
                  03 / The note
                  <textarea
                    id="message"
                    name="message"
                    required
                    autoComplete="off"
                    value={formState.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="What are you building, and where do you need help?"
                    className="journal-input mt-2 h-36 resize-none font-sans text-base normal-case"
                  />
                </label>

                <div className="flex flex-col gap-5 border-t journal-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[10px] leading-5 text-[var(--muted)]">
                    Prefer direct email? {LINKS.email}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="journal-button w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                  >
                    {isSubmitting ? "Sending note..." : "Send correspondence"}
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : (
              <FormSkeleton />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
