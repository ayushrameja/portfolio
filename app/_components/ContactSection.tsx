import { LINKS } from "@/constants/links";

const contactLinks = [
  { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}` },
  { label: "LinkedIn", value: "ayushrameja", href: LINKS.linkedin },
  { label: "GitHub", value: "ayushrameja", href: LINKS.github },
] as const;

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section" data-palette="cobalt" aria-labelledby="contact-title">
      <div className="site-container contact-section__grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Looking for a senior engineer who can follow the system end to end?</h2>
        </div>
        <div className="contact-section__body">
          <p>
            I am interested in ambitious full-stack and platform work where product
            quality, system reliability, and thoughtful delivery matter equally.
          </p>
          <div className="contact-links">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
