import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Project } from "@/types/project";
import { experiencePath } from "@/utils/experienceData";

type ProjectCardProps = {
  project: Project;
  index?: number;
  linkEmployerBadge?: boolean;
};

export default function ProjectCard({
  project,
  index = 0,
  linkEmployerBadge = true,
}: ProjectCardProps) {
  return (
    <article className="grid gap-8 border-b journal-rule py-10 lg:grid-cols-12 lg:py-14">
      <div className="lg:col-span-2">
        <p className="font-mono text-xs text-[var(--vermilion)]">P.{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-3 font-mono text-[10px] uppercase leading-5 text-[var(--muted)]">
          {project.timeline ?? "Selected project"}
        </p>
      </div>

      <div className="lg:col-span-4">
        {linkEmployerBadge ? (
          <Link
            href={experiencePath(project.employerKey)}
            className="font-mono text-[10px] uppercase text-[var(--cobalt)] hover:underline"
          >
            {project.client} / Employer chapter
          </Link>
        ) : (
          <p className="font-mono text-[10px] uppercase text-[var(--cobalt)]">{project.client}</p>
        )}
        <h3 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">{project.name}</h3>
        <p className="mt-4 text-sm font-bold">{project.role}</p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {project.skills.map((skill) => (
            <span key={skill} className="font-mono text-[10px] text-[var(--muted)]">{skill}</span>
          ))}
        </div>
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="journal-link mt-7"
          >
            Related project page
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="lg:col-span-6 lg:border-l lg:pl-10 journal-rule">
        <p className="journal-kicker">Selected outcomes</p>
        <ol className="mt-6 space-y-5">
          {project.points.map((point, pointIndex) => (
            <li key={point} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
              <span className="font-mono text-[10px] text-[var(--faint)]">{String(pointIndex + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-7 text-[var(--muted)] sm:text-base">{point}</span>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}
