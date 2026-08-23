"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { experienceBySlug, experiencePath } from "@/utils/experienceData";
import { featuredProjects } from "@/utils/projectData";

export default function FeaturedCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [measured, setMeasured] = useState(false);
  const [canMeasure, setCanMeasure] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const updateMedia = () => setDesktop(media.matches);
    updateMedia();
    media.addEventListener("change", updateMedia);
    return () => media.removeEventListener("change", updateMedia);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCanMeasure(typeof ResizeObserver !== "undefined");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!canMeasure || !viewport || !track) return;

    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
      setMeasured(true);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [canMeasure, desktop, reducedMotion]);

  const enhanceable = canMeasure && desktop && !reducedMotion;
  const pinned = enhanceable && measured && distance > 0;
  const sectionHeight = pinned ? `calc(100svh + ${distance}px)` : undefined;

  const revealFocusedCard = (index: number) => {
    if (!pinned || !sectionRef.current || featuredProjects.length < 2) return;
    const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    const target = sectionTop + (index / (featuredProjects.length - 1)) * distance;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={`selected-work-section${pinned ? " is-pinned" : ""}`}
      data-palette="ink"
      style={{ height: sectionHeight }}
      aria-labelledby="selected-work-title"
    >
      <div ref={viewportRef} className="selected-work-viewport">
        <div className="selected-work-header site-container">
          <div>
            <p className="eyebrow">Selected professional work</p>
            <h2 id="selected-work-title">Three projects. Three kinds of scale.</h2>
          </div>
          <p>Scroll to follow the work · every project stacks normally on smaller screens.</p>
        </div>

        <motion.div
          ref={trackRef}
          className={`selected-work-track${enhanceable ? " is-horizontal-measure" : ""}`}
          style={pinned ? { x } : undefined}
        >
          {featuredProjects.map((project, index) => {
            const employer = experienceBySlug[project.employerKey];
            return (
              <article
                key={project.slug}
                className="selected-project-card"
                onFocusCapture={() => revealFocusedCard(index)}
              >
                <div className="selected-project-card__topline">
                  <span>0{index + 1} / 0{featuredProjects.length}</span>
                  <span>{employer.companyName}</span>
                </div>
                <div className="selected-project-card__body">
                  <p className="selected-project-card__role">{project.role}</p>
                  <h3>{project.title}</h3>
                  <p className="selected-project-card__summary">{project.summary}</p>
                  <ul className="selected-project-card__outcomes">
                    {project.outcomes.slice(0, 2).map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="selected-project-card__footer">
                  <ul className="tag-list" aria-label="Technologies">
                    {project.skills.slice(0, 4).map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                  <Link className="text-link text-link--light" href={experiencePath(project.employerKey)}>
                    View case study <span aria-hidden>↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
