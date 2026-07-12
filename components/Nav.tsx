"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Home,
  Mail,
  MessageCircleMore,
  PenLine,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLenis } from "lenis/react";

import ThemeToggle from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks";
import { scrollToTarget } from "@/utils/scroll";

const HOME_LINKS = [
  { id: "cover", label: "Cover", number: "00", Icon: Home },
  { id: "bakbak", label: "Bakbak", number: "P1", Icon: MessageCircleMore },
  { id: "work", label: "Work", number: "01", Icon: BriefcaseBusiness },
  { id: "notes", label: "Notes", number: "02", Icon: PenLine },
  { id: "correspondence", label: "Write", number: "04", Icon: Mail },
] as const;

function routeLabel(pathname: string) {
  if (pathname === "/bakbak") return "Product / Bakbak";
  if (pathname.startsWith("/experience/")) return "Work chapter";
  if (pathname.startsWith("/blogs/")) return "Field note";
  if (pathname === "/blogs") return "Field notes";
  if (pathname === "/resume") return "Resume";
  return "Portfolio";
}

export default function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const [showExternal, setShowExternal] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setShowExternal(window.scrollY > window.innerHeight * 0.48);
    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const innerLinks = useMemo(() => {
    if (pathname === "/blogs" || pathname.startsWith("/blogs/")) {
      return [
        { href: "/", label: "Portfolio", Icon: Home },
        { href: "/resume", label: "Resume", Icon: FileText },
      ];
    }

    if (pathname === "/resume") {
      return [
        { href: "/", label: "Portfolio", Icon: Home },
        { href: "/blogs", label: "Field notes", Icon: BookOpen },
      ];
    }

    return [
      { href: "/", label: "Portfolio", Icon: Home },
      { href: "/blogs", label: "Field notes", Icon: BookOpen },
      { href: "/resume", label: "Resume", Icon: FileText },
    ];
  }, [pathname]);

  return (
    <motion.nav
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Portfolio chapters"
    >
      <div className="pointer-events-auto mx-auto flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-[6px] border border-[var(--rule-strong)] bg-[var(--paper-raised)] p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.38)]">
        <Link
          href="/"
          className="flex h-9 min-w-9 items-center justify-center rounded-[3px] bg-[var(--ink)] px-2 font-mono text-xs font-semibold text-[var(--paper)] transition hover:bg-[var(--cobalt)]"
          aria-label="Ayush Rameja portfolio"
        >
          AR
        </Link>

        <span className="hidden max-w-28 truncate border-l border-[var(--rule)] px-2 font-mono text-[10px] uppercase text-[var(--muted)] lg:block">
          {routeLabel(pathname)}
        </span>

        <div className="flex items-center gap-0.5 border-l border-[var(--rule)] pl-1">
          {isHome
            ? HOME_LINKS.map(({ id, label, number, Icon }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToTarget(id, lenis as never)}
                    className={`group flex h-9 items-center justify-center gap-1.5 rounded-[3px] px-2 text-xs font-semibold transition sm:px-3 ${
                      isActive
                        ? "bg-[var(--cobalt)] text-white dark:text-[#10110f]"
                        : "text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
                    }`}
                    aria-label={label}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">{label}</span>
                    <span className={`hidden font-mono text-[9px] lg:inline ${isActive ? "opacity-75" : "text-[var(--faint)]"}`}>
                      {number}
                    </span>
                  </button>
                );
              })
            : innerLinks.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-[3px] px-2 text-xs font-semibold text-[var(--muted)] transition hover:bg-[var(--paper)] hover:text-[var(--cobalt)] sm:px-3"
                  aria-label={label}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              ))}
        </div>

        <AnimatePresence initial={false}>
          {isHome && showExternal ? (
            <motion.div
              className="flex items-center gap-0.5 border-l border-[var(--rule)] pl-1"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.22 }}
            >
              <Link
                href="/blogs"
                className="flex h-9 items-center gap-1.5 rounded-[3px] px-2 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--cobalt)]"
                aria-label="Field notes"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Notes</span>
              </Link>
              <Link
                href="/resume"
                className="flex h-9 items-center gap-1.5 rounded-[3px] px-2 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--cobalt)]"
                aria-label="Resume"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Resume</span>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="border-l border-[var(--rule)] pl-1">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
