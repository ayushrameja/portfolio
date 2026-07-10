"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";

import { LINKS, RESUME } from "@/constants/links";
import { getOrderedExperiences } from "@/utils/experienceData";
import { profile } from "@/utils/profileData";
import { projects } from "@/utils/projectData";

const experiences = getOrderedExperiences();
const skills = Array.from(new Set(projects.flatMap((project) => project.skills)));

export default function ResumeContent() {
  return (
    <motion.main
      className="journal-shell pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 pb-16 pt-6 sm:px-8 sm:pb-24 sm:pt-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <header className="flex items-center justify-between gap-4 border-y journal-rule py-3">
            <Link href="/" className="journal-link font-mono text-xs uppercase">
              <ArrowLeft className="h-4 w-4" /> Portfolio
            </Link>
            <p className="font-mono text-[10px] uppercase text-[var(--muted)]">Curated web resume / 2026</p>
          </header>

          <section className="grid gap-9 py-10 lg:grid-cols-12 lg:items-end lg:py-16">
            <div className="lg:col-span-8">
              <p className="journal-kicker">03 / Resume</p>
              <h1 className="mt-5 font-serif text-7xl leading-[0.9] sm:text-8xl lg:text-[8rem]">{profile.name}</h1>
              <p className="mt-6 max-w-3xl font-serif text-3xl leading-tight text-[var(--cobalt)] sm:text-4xl">{profile.statement}</p>
            </div>
            <div className="border-t journal-rule pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-base leading-8 text-[var(--muted)]">{profile.summary}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={RESUME.downloadUrl} download className="journal-button">
                  Download complete PDF <Download className="h-4 w-4" />
                </a>
                <a href={RESUME.previewUrl} target="_blank" rel="noopener noreferrer" className="journal-button-secondary">
                  Open PDF <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <section className="grid border-y journal-rule sm:grid-cols-3">
            {profile.metrics.map((metric, index) => (
              <div key={metric.label} className={`py-6 sm:px-7 sm:py-8 ${index ? "border-t journal-rule sm:border-l sm:border-t-0" : ""}`}>
                <p className="font-serif text-5xl text-[var(--vermilion)] sm:text-6xl">{metric.value}</p>
                <p className="mt-2 max-w-[20ch] font-mono text-[10px] leading-5 text-[var(--muted)]">{metric.label}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-3">
              <p className="journal-kicker">Experience</p>
              <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--muted)]">A compact web edition. The downloadable PDF remains the complete formal record.</p>
            </div>
            <div className="lg:col-span-9">
              {experiences.map((exp) => (
                <article key={exp.slug} className="grid gap-5 border-b journal-rule py-8 first:border-t sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <div>
                    <p className="font-mono text-xs text-[var(--vermilion)]">{exp.chapterNumber}</p>
                    <p className="mt-3 font-mono text-[10px] leading-5 text-[var(--muted)]">{exp.dateRange}</p>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="font-serif text-4xl">{exp.companyName}</h2>
                      <p className="text-sm font-bold">{exp.roleLine}</p>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)]">{exp.thesis}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {exp.focus.map((item) => <span key={item} className="font-mono text-[10px] text-[var(--faint)]">{item}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y journal-rule bg-[var(--paper-raised)] py-12 sm:py-16">
            <div className="grid gap-8 px-4 sm:px-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="journal-kicker">Selected work</p>
              </div>
              <div className="lg:col-span-9">
                {projects.map((project, index) => (
                  <article key={project.id} className="grid gap-4 border-b journal-rule py-6 first:border-t sm:grid-cols-[2rem_minmax(0,1fr)_auto]">
                    <span className="font-mono text-[10px] text-[var(--vermilion)]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-serif text-2xl">{project.name}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{project.role} / {project.client}</p>
                    </div>
                    <p className="font-mono text-[10px] text-[var(--faint)] sm:text-right">{project.skills.slice(0, 3).join(" / ")}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-3"><p className="journal-kicker">Technical range</p></div>
            <div className="lg:col-span-9">
              <div className="grid border-t journal-rule sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill, index) => (
                  <p key={skill} className={`border-b journal-rule py-4 font-mono text-xs ${index % 3 ? "lg:border-l lg:pl-5" : ""} ${index % 2 ? "sm:border-l sm:pl-5 lg:border-l" : ""}`}>
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <footer className="flex flex-col gap-5 border-y journal-rule py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-2xl">Correspondence</p>
              <p className="mt-2 font-mono text-[10px] text-[var(--muted)]">{LINKS.email} / {LINKS.phoneDisplay} / {profile.location}</p>
            </div>
            <div className="flex gap-5">
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="journal-link">LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="journal-link">GitHub <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </footer>
        </div>
      </div>
    </motion.main>
  );
}
