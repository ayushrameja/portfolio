import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/_components/Footer";
import ProjectPanel from "@/components/portfolio/ProjectPanel";
import { selectedWork } from "@/utils/selectedWork";

export const metadata: Metadata = {
  title: "Work | Ayush Rameja",
  description:
    "Products, client websites, and game prototypes by Ayush Rameja.",
  alternates: { canonical: "/work" },
};
export default function Work() {
  return (
    <>
      <main className="portfolio-container directory-page">
        <header className="directory-heading">
          <p className="eyebrow">Selected projects</p>
          <h1 data-reveal>
            Work, with
            <br />
            <span>a little range.</span>
          </h1>
          <p>
            Products, client websites, and game prototypes. Each has its own
            story.
          </p>
        </header>
        <section
          className="project-pair work-grid"
          aria-label="Selected projects"
        >
          <h2 className="sr-only">Project collection</h2>
          {selectedWork.map((project) => (
            <ProjectPanel key={project.slug} project={project} />
          ))}
        </section>
        <Link href="/playground" className="directory-next">
          Smaller things &amp; older experiments → Playground
        </Link>
      </main>
      <Footer />
    </>
  );
}
