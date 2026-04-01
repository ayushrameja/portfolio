"use client";

import { motion } from "framer-motion";

import { scrollFadeUp } from "@/lib/animations";
import TextReveal from "@/components/TextReveal";
import ExperienceCard from "./ExperienceCard";
import {
  getOrderedExperiences,
  getProjectsForEmployer,
} from "@/utils/experienceData";

export default function ExperienceSection() {
  const experiences = getOrderedExperiences();

  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <TextReveal
              as="h2"
              className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              Experience
            </TextReveal>
            <TextReveal
              as="p"
              delay={0.1}
              className="mt-2 text-zinc-600 dark:text-zinc-300"
            >
              Roles and delivery by employer—open a card for full project
              detail.
            </TextReveal>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {experiences.map((exp) => (
            <motion.div
              key={exp.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scrollFadeUp}
              className="min-h-0"
            >
              <ExperienceCard
                exp={exp}
                projectCount={getProjectsForEmployer(exp.slug).length}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
