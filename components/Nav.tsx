"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
  { href: "mailto:wave@ayush.im", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="site-header portfolio-container">
      <Link href="/" className="wordmark" aria-label="Ayush Rameja, homepage">
        Ayush Rameja<span aria-hidden="true">*</span>
      </Link>
      <nav aria-label="Primary navigation">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href || pathname.startsWith(`${href}/`)
                ? "page"
                : undefined
            }
            data-cursor={label === "Contact" ? "HI!" : "GO"}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
