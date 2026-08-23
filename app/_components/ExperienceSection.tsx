import Link from "next/link";

import ExperienceLogo from "@/components/experience/ExperienceLogo";
import { experiencePath, getOrderedExperiences } from "@/utils/experienceData";

export default function ExperienceSection() {
  const experiences = getOrderedExperiences();

  return (
    <section id="work" className="experience-section" data-palette="mist">
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Professional experience</p>
            <h2>Systems that grew in scale, stakes, and responsibility.</h2>
          </div>
          <p>
            Five years across content platforms, learning products, industrial systems,
            and enterprise software—from hands-on delivery to technical leadership.
          </p>
        </div>

        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article key={experience.slug} className="experience-row">
              <div className="experience-row__index">0{index + 1}</div>
              <div className="experience-row__company">
                <ExperienceLogo slug={experience.slug} variant="index" />
                <p>{experience.companyName}</p>
              </div>
              <div className="experience-row__body">
                <div className="experience-row__title">
                  <h3>{experience.roleLine}</h3>
                  <span>{experience.dateRange}</span>
                </div>
                {experience.viaLabel ? (
                  <p className="experience-row__via">via {experience.viaLabel}</p>
                ) : null}
                <p className="experience-row__summary">{experience.thesis}</p>
                <ul>
                  {experience.caseStudy.impact.slice(0, 2).map((impact) => (
                    <li key={impact}>{impact}</li>
                  ))}
                </ul>
                <Link className="text-link" href={experiencePath(experience.slug)}>
                  View case study <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
