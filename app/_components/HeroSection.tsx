import Image from "next/image";
import Link from "next/link";

const metrics = [
  { value: "5+", label: "years" },
  { value: "5M+", label: "monthly page views" },
  { value: "300+", label: "PRs reviewed" },
] as const;

export default function HeroSection() {
  return (
    <section id="home" className="hero-section" data-palette="paper">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Bangalore, India · Product platforms</p>
          <h1>Senior full-stack engineer building reliable product platforms.</h1>
          <p className="hero-role">
            Senior Software Engineer at Autodesk <span>via Quarks Technosoft</span>
          </p>
          <p className="hero-summary">
            From interface to infrastructure, I ship Next.js products, backend services,
            and cloud systems that hold up under real use.
          </p>
          <div className="hero-actions">
            <Link className="site-button site-button--primary" href="#work">
              View professional work
            </Link>
            <Link className="site-button site-button--secondary" href="/resume">
              View résumé
            </Link>
          </div>
        </div>

        <figure className="hero-portrait">
          <div className="hero-portrait__image">
            <Image
              src="/assets/image/profile-pic.png"
              alt="Ayush Rameja"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 38vw"
              className="object-cover object-[center_42%]"
            />
          </div>
          <figcaption>
            <span>Currently</span>
            Building web and learning platforms used at meaningful scale.
          </figcaption>
        </figure>

        <dl className="hero-metrics">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
