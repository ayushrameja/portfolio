import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Footer from "./_components/Footer";
import Portrait from "@/components/portfolio/Portrait";
import ProjectPanel from "@/components/portfolio/ProjectPanel";
import { selectedWork } from "@/utils/selectedWork";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <main className="portfolio-container home-page">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Ayush Rameja / Engineer + maker</p>
            <h1 data-reveal>
              Systems thinker.
              <br />
              <span>Playful maker.</span>
            </h1>
            <p className="introduction">
              I build products, games, and the systems behind them.
            </p>
            <p className="hero-experience">
              <strong>Senior Software Engineer at Autodesk</strong>
              <br />
              via Quarks Technosoft · Previously Siemens &amp; Accenture
            </p>
          </div>
          <Portrait />
        </section>
        <section
          id="work"
          className="selected-section"
          aria-labelledby="selected-heading"
        >
          <div className="section-top">
            <h2 id="selected-heading">
              A few things I&apos;ve made <ArrowDownRight aria-hidden="true" />
            </h2>
            <Link href="/work" className="text-link">
              See all work <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="project-pair">
            {[selectedWork[0], selectedWork[2]].map((project) => (
              <ProjectPanel key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <section className="explore-more" aria-label="Explore more">
          <Link href="/playground" data-cursor="PLAY">
            <span className="explore-glyph" aria-hidden="true">
              {"{*}"}
            </span>
            <span>
              <strong>Playground</strong>
              <small>Small tools. Happy accidents.</small>
            </span>
            <span className="explore-all">
              See all <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
          <Link href="/blogs">
            <span className="explore-glyph" aria-hidden="true">
              Aa
            </span>
            <span>
              <strong>Writing</strong>
              <small>Notes from the workbench.</small>
            </span>
            <span className="explore-all">
              See all <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
