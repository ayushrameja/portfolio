"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const links = [
  { href: "/#work", label: "Work", route: "#work" },
  { href: "/blogs", label: "Writing", route: "/blogs" },
  { href: "/resume", label: "Résumé", route: "/resume" },
  { href: "/#contact", label: "Contact", route: "#contact" },
] as const;

const PENDING_ANCHOR_KEY = "portfolio-pending-anchor";
const homepageAnchors = new Set(["work", "contact"]);

function scrollToHomepageSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  const top = window.scrollY + target.getBoundingClientRect().top - 84;
  window.scrollTo({ top, behavior: "auto" });
  return true;
}

export default function Nav() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    dialogRef.current?.close();
    document.documentElement.classList.remove("menu-open");
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const pending = window.sessionStorage.getItem(PENDING_ANCHOR_KEY);
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const targetId = pending || hash;
    if (!homepageAnchors.has(targetId)) return;

    const alignTarget = () => {
      if (scrollToHomepageSection(targetId)) {
        window.sessionStorage.removeItem(PENDING_ANCHOR_KEY);
      }
    };

    const frame = window.requestAnimationFrame(alignTarget);
    const firstRetry = window.setTimeout(alignTarget, 180);
    const finalRetry = window.setTimeout(alignTarget, 500);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(firstRetry);
      window.clearTimeout(finalRetry);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["work", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    const updateCurrentSection = () => {
      const marker = window.innerHeight * 0.4;
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom >= marker;
      });
      setActiveSection(current?.id ?? null);
    };

    updateCurrentSection();
    window.addEventListener("scroll", updateCurrentSection, { passive: true });
    window.addEventListener("resize", updateCurrentSection);
    return () => {
      window.removeEventListener("scroll", updateCurrentSection);
      window.removeEventListener("resize", updateCurrentSection);
    };
  }, [pathname]);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.documentElement.classList.add("menu-open");
    setMenuOpen(true);
  };

  const closeMenu = () => {
    dialogRef.current?.close();
    document.documentElement.classList.remove("menu-open");
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  const trapMenuFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const isCurrent = (route: string) => {
    if (route === "#work") {
      return pathname.startsWith("/experience") || (pathname === "/" && activeSection === "work");
    }
    if (route === "#contact") return pathname === "/" && activeSection === "contact";
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const handleHomepageAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    route: string,
  ) => {
    if (!route.startsWith("#")) return;
    const targetId = route.slice(1);
    if (pathname !== "/") {
      window.sessionStorage.setItem(PENDING_ANCHOR_KEY, targetId);
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `/#${targetId}`);
    scrollToHomepageSection(targetId);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-wordmark" aria-label="Ayush Rameja home">
          Ayush Rameja
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="site-nav__link"
              onClick={(event) => handleHomepageAnchor(event, link.route)}
              aria-current={isCurrent(link.route) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={triggerRef}
          type="button"
          className="site-menu-trigger"
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
        >
          Menu
        </button>

        <dialog
          ref={dialogRef}
          id="mobile-navigation"
          className="site-menu"
          aria-label="Mobile navigation"
          onKeyDown={trapMenuFocus}
          onClose={() => {
            document.documentElement.classList.remove("menu-open");
            setMenuOpen(false);
          }}
          onCancel={(event) => {
            event.preventDefault();
            closeMenu();
          }}
        >
          <div className="site-menu__bar">
            <span className="site-wordmark">Ayush Rameja</span>
            <button type="button" className="site-menu-trigger" onClick={closeMenu}>
              Close
            </button>
          </div>
          <nav className="site-menu__links" aria-label="Mobile primary navigation">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="site-menu__link"
                onClick={(event) => {
                  handleHomepageAnchor(event, link.route);
                  closeMenu();
                }}
                aria-current={isCurrent(link.route) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="site-menu__note">Senior full-stack engineer · Bangalore, India</p>
        </dialog>
      </div>
    </header>
  );
}
