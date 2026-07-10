"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import ExperienceLogo from "@/components/experience/ExperienceLogo";
import { experiencePath, getOrderedExperiences } from "@/utils/experienceData";

export default function ExperienceSection() {
  const experiences = getOrderedExperiences();

  return (
    <section className="relative px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto w-full max-w-[88rem]">
        <div className="grid gap-6 border-b journal-rule pb-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="journal-kicker">01 / Work archive</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="max-w-[15ch] font-serif text-4xl leading-none sm:text-6xl">
              Three chapters. One increasingly larger systems problem.
            </h2>
          </div>
        </div>

        <div>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={experiencePath(exp.slug)}
                className="group relative grid gap-6 border-b journal-rule py-8 transition-colors hover:text-[var(--cobalt)] sm:py-10 lg:grid-cols-12 lg:items-center"
              >
                <span className="absolute inset-y-0 left-1/2 right-1/2 -z-10 bg-[var(--paper-raised)] transition-all duration-500 group-hover:left-0 group-hover:right-0" />
                <div className="flex items-center justify-between lg:col-span-2 lg:block">
                  <p className="font-mono text-sm text-[var(--vermilion)]">{exp.chapterNumber}</p>
                  <p className="mt-2 hidden font-mono text-[10px] uppercase text-[var(--muted)] lg:block">Chapter</p>
                </div>
                <div className="lg:col-span-3">
                  <ExperienceLogo slug={exp.slug} variant="index" />
                  <p className="mt-3 text-sm font-bold">{exp.companyName}</p>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-serif text-3xl leading-tight sm:text-4xl">{exp.chapterTitle}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">{exp.thesis}</p>
                </div>
                <div className="flex items-end justify-between gap-6 lg:col-span-3">
                  <div>
                    <p className="text-sm font-bold">{exp.roleLine}</p>
                    <p className="mt-1 font-mono text-[10px] leading-5 text-[var(--muted)]">{exp.dateRange}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[var(--rule-strong)] transition group-hover:border-[var(--cobalt)] group-hover:bg-[var(--cobalt)] group-hover:text-white dark:group-hover:text-[#10110f]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
