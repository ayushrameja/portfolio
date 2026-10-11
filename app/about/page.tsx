import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/app/_components/Footer";
import Portrait from "@/components/portfolio/Portrait";
import { getOrderedExperiences } from "@/utils/experienceData";

export const metadata: Metadata = {
  title: "About | Ayush Rameja",
  description:
    "Engineer, maker, and founder of Low HP Studio. Based in Bangalore, India.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <main className="portfolio-container directory-page">
        <header className="directory-heading about-heading">
          <div>
            <p className="eyebrow">A little about me</p>
            <h1 data-reveal>
              Engineer.
              <br />
              <span>Curious person.</span>
            </h1>
            <p>
              I&apos;m Ayush Rameja. I work across product interfaces, backend
              services, and cloud delivery. Based in Bangalore, India.
            </p>
          </div>
          <Portrait />
        </header>
        <section className="about-studio">
          <p className="eyebrow">After the day job</p>
          <h2>Some ideas don&apos;t clock out.</h2>
          <p>
            I founded Low HP Studio as a place to build games, websites, and
            ideas I can&apos;t quite leave alone. Burnhop, Greytrace, and
            Templio live in that world.
          </p>
          <a className="text-link" href="https://lowhp.studio/">
            Visit Low HP Studio <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>
        <section id="experience" className="experience-list">
          <div className="section-top">
            <h2>The engineering part</h2>
            <Link href="/resume" className="text-link">
              Full résumé <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {getOrderedExperiences().map((exp) => (
            <article key={exp.slug}>
              <p className="experience-date">{exp.dateRange}</p>
              <div>
                <h3>{exp.companyName}</h3>
                <p>
                  {exp.roleLine}
                  {exp.viaLabel ? ` · via ${exp.viaLabel}` : ""}
                </p>
                <p>{exp.thesis}</p>
                <Link href={`/experience/${exp.slug}`} className="text-link">
                  Explore experience{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </section>
        <div className="about-social">
          <a href="https://github.com/ayushrameja" className="text-link">
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/ayushrameja"
            className="text-link"
          >
            LinkedIn ↗
          </a>
          <Link href="/blogs" className="text-link">
            Read my writing ↗
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
