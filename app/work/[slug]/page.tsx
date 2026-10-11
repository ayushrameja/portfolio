import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Footer from "@/app/_components/Footer";
import { selectedWork } from "@/utils/selectedWork";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return selectedWork.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = selectedWork.find((item) => item.slug === slug);
  return {
    title: `${project?.name ?? "Project"} | Ayush Rameja`,
    description: project?.summary,
    alternates: { canonical: `/work/${slug}` },
  };
}
export default async function Project({ params }: Props) {
  const { slug } = await params;
  const project = selectedWork.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <>
      <main className="portfolio-container project-detail">
        <Link href="/work" className="text-link">
          <ArrowLeft size={16} aria-hidden="true" /> All work
        </Link>
        <header className="directory-heading">
          <p className="eyebrow">
            {project.type} / {project.status}
          </p>
          <h1 data-reveal>{project.name}</h1>
          <p>{project.summary}</p>
        </header>
        <figure className={`detail-image tone-${project.tone}`}>
          <Image
            src={project.image}
            alt={project.alt}
            width={1309}
            height={818}
            priority
            sizes="(max-width: 700px) 92vw, 90vw"
          />
          <figcaption>
            {project.slug === "bakbak"
              ? "Bakbak 2 local demo · fictional members"
              : "Project capture · October 2026"}
          </figcaption>
        </figure>
        <div className="project-story">
          <aside>
            <p className="eyebrow">My role</p>
            <p>{project.role}</p>
            <p className="eyebrow stack-label">Built with</p>
            <p>{project.stack.join(" · ")}</p>
          </aside>
          <div>
            <section>
              <h2>The idea</h2>
              <p>{project.story}</p>
            </section>
            <section>
              <h2>Where it stands</h2>
              <p>{project.scope}</p>
            </section>
            <div className="project-actions">
              <a href={project.href} className="solid-link">
                {project.slug === "bakbak"
                  ? "Explore Bakbak & downloads"
                  : "Visit project"}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              {project.source && (
                <a href={project.source} className="text-link">
                  View source <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
