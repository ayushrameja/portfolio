"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Project } from "@/types/project";
import { projects } from "@/utils/projectData";
import { scrollFadeUp } from "@/lib/animations";
import TextReveal from "@/components/TextReveal";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <TextReveal as="h2" className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Selected work
            </TextReveal>
            <TextReveal as="p" delay={0.1} className="mt-2 text-zinc-600 dark:text-zinc-300">
              A few projects that highlight my role, skills, and impact.
            </TextReveal>
          </div>
        </div>

        <div className="mt-10 space-y-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scrollFadeUp}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/60 p-8 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.22)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.26)] dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.7)] dark:hover:border-zinc-600/70 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl dark:bg-fuchsia-400/10" />
        <div className="absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/8" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="min-w-0 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                {project.client}
              </span>
              <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200">
                {project.role}
              </span>
            </div>

            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 bg-white/40 px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-white/60 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
              >
                <span>See more</span>
                <span aria-hidden className="text-zinc-500 dark:text-zinc-400">
                  ↗
                </span>
              </Link>
            )}
          </div>

          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {project.name}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 lg:border-l lg:border-zinc-200/70 lg:pl-8 dark:lg:border-zinc-700/60">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">HIGHLIGHTS</p>

          <ul className="mt-5 space-y-4">
            {project.points.map((point: string, index: number) => (
              <li key={index} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500 dark:bg-fuchsia-300"
                />
                <span className="text-base leading-7 text-zinc-700 dark:text-zinc-200">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
