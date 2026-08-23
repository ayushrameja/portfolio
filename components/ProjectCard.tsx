import Link from "next/link";

import type { PortfolioProject } from "@/types/project";
import { experienceBySlug, experiencePath } from "@/utils/experienceData";

type ProjectCardProps = {
  project: PortfolioProject;
  index?: number;
  linkEmployerBadge?: boolean;
};

export default function ProjectCard({
  project,
  index = 0,
  linkEmployerBadge = true,
}: ProjectCardProps) {
  const employer = experienceBySlug[project.employerKey];

  return (
    <article className="project-detail-card">
      <div className="project-detail-card__meta">
        <span>0{index + 1}</span>
        {linkEmployerBadge ? (
          <Link href={experiencePath(project.employerKey)}>{employer.companyName}</Link>
        ) : (
          <p>{employer.companyName}</p>
        )}
      </div>

      <div className="project-detail-card__intro">
        <h3>{project.title}</h3>
        <p className="project-detail-card__role">{project.role}</p>
        <p className="project-detail-card__summary">{project.summary}</p>
        <ul className="tag-list" aria-label="Technologies">
          {project.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>

      <div className="project-detail-card__outcomes">
        <p className="eyebrow">Selected outcomes</p>
        <ul>
          {project.outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
