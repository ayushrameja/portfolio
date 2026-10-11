import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="site-footer portfolio-container">
      <div>
        <p className="eyebrow">Have something in mind?</p>
        <a
          className="contact-link"
          href="mailto:wave@ayush.im"
          data-cursor="HI!"
        >
          Let&apos;s make it happen <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-meta">
        <Link href="/about">More about me</Link>
        <span>© {new Date().getFullYear()} Ayush Rameja</span>
      </div>
    </footer>
  );
}
