"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import ExperienceLogo from "@/components/experience/ExperienceLogo";
import { experienceBySlug, getProjectsForEmployer } from "@/utils/experienceData";

const exp = experienceBySlug.autodesk;
const projects = getProjectsForEmployer("autodesk");

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeaturedCaseStudy() {
  return (
    <section id="work" className="relative border-y journal-rule bg-[var(--paper-raised)] px-4 py-16 sm:px-8 sm:py-24">
      <motion.div
        className="mx-auto w-full max-w-[88rem]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <div className="grid gap-8 lg:grid-cols-12">
          <motion.div variants={reveal} className="lg:col-span-4">
            <p className="journal-kicker">{exp.chapterNumber} / Featured case study</p>
            <ExperienceLogo slug="autodesk" variant="hero" className="mt-6" />
            <p className="mt-6 font-mono text-xs text-[var(--muted)]">
              {exp.dateRange}<br />{exp.location}
            </p>
          </motion.div>

          <motion.div variants={reveal} className="lg:col-span-8">
            <h2 className="max-w-[15ch] font-serif text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
              {exp.chapterTitle}: <span className="text-[var(--cobalt)]">products that hold up under real use.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {exp.thesis} The work crosses content platforms, learning systems, APIs, caching, queues, and the team practices required to ship them well.
            </p>
          </motion.div>
        </div>

        <motion.div variants={reveal} className="mt-12 grid border-y journal-rule sm:grid-cols-3">
          {exp.impactMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`py-6 sm:px-6 sm:py-8 ${index > 0 ? "border-t journal-rule sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="font-serif text-5xl leading-none text-[var(--vermilion)] sm:text-6xl">{metric.value}</p>
              <p className="mt-3 max-w-[18ch] font-mono text-xs leading-5 text-[var(--muted)]">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 grid border-b journal-rule lg:grid-cols-2">
          {[
            { number: "A", title: "Context", body: exp.caseStudy.context },
            { number: "B", title: "Contribution", body: exp.caseStudy.contribution },
          ].map((item, index) => (
            <motion.article
              key={item.title}
              variants={reveal}
              className={`border-t journal-rule py-8 lg:pr-10 ${index === 1 ? "lg:border-l lg:pl-10 lg:pr-0" : ""}`}
            >
              <p className="font-mono text-xs text-[var(--cobalt)]">{item.number} / {item.title}</p>
              <p className="mt-5 max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.div variants={reveal} className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <div>
            <p className="journal-kicker">Selected systems</p>
            <div className="mt-4 space-y-3">
              {projects.map((project, index) => (
                <div key={project.id} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--vermilion)]">0{index + 1}</span>
                  <span className="font-serif text-2xl">{project.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="journal-kicker">Working range</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--muted)]">{exp.focus.join(" / ")}</p>
          </div>
          <Link href="/experience/autodesk" className="journal-button w-full lg:w-auto">
            Read chapter
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div variants={reveal} className="mt-8 flex justify-end">
          <a
            href={exp.externalLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="journal-link"
          >
            Visit Autodesk
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
