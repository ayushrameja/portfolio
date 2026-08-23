import Link from "next/link";

import { LINKS } from "@/constants/links";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__inner">
        <p>© {new Date().getFullYear()} Ayush Rameja · Bangalore, India</p>
        <div>
          <Link href="/">Portfolio</Link>
          <Link href="/blogs">Writing</Link>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </div>
    </footer>
  );
}
