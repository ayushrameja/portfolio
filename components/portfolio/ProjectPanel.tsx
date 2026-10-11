import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SelectedProject } from "@/utils/selectedWork";

export default function ProjectPanel({
  project,
}: {
  project: SelectedProject;
}) {
  return (
    <article className={`project-panel tone-${project.tone}`} data-reveal>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="VIEW"
        className="project-panel-link"
      >
        <div className="project-image">
          <Image
            src={project.image}
            alt={project.alt}
            loading={project.slug === "bakbak" ? "eager" : "lazy"}
            width={1309}
            height={818}
            sizes="(max-width: 700px) 92vw, 46vw"
          />
          <span className="project-preview-label" aria-hidden="true">
            Take a look <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="project-label">
          <h3>{project.name}</h3>
          <ArrowUpRight aria-hidden="true" />
          <p>
            {project.type} · {project.status}
          </p>
        </div>
      </Link>
    </article>
  );
}
