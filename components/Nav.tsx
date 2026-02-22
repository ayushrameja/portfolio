"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useAppStore } from "@/store/store";
import ThemeToggle from "@/components/ThemeToggle";
import { STORM_TRIGGER_EVENT } from "@/utils/storm";
import StaggeredText from "@/components/StaggerText";
import { useActiveSection } from "@/hooks";

import logo from "../public/assets/image/logo.svg";

const MotionLink = motion.create(Link);

const Nav = () => {
  const pathname = usePathname();
  const [enterDelay, setEnterDelay] = useState(0.9);

  const isHomeRoute = pathname === "/";
  const activeHomeSection = useActiveSection(isHomeRoute);
  const isBlogsRoute = pathname === "/blogs" || pathname.startsWith("/blogs/");
  const isResumeRoute = pathname === "/resume";

  const showExternal = useAppStore((state) => state.showExternal);
  const currentRoute = useAppStore((state) => state.currentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);

  useEffect(() => {
    const handleStorm = (event: Event) => {
      const detail = (event as CustomEvent<{ cause?: string }>).detail ?? {};
      if (detail.cause === "load") {
        setEnterDelay(0.9);
      } else {
        setEnterDelay(0.08);
      }
    };
    window.addEventListener(STORM_TRIGGER_EVENT, handleStorm as EventListener);

    return () =>
      window.removeEventListener(
        STORM_TRIGGER_EVENT,
        handleStorm as EventListener,
      );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isBlogsRoute || isResumeRoute) {
        setShowExternal(false);
        return;
      }

      if (window.scrollY > window.innerHeight * 0.5) {
        setShowExternal(true);
      } else {
        setShowExternal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogsRoute, isResumeRoute, setShowExternal]);

  useEffect(() => {
    if (isHomeRoute || isBlogsRoute || isResumeRoute) {
      setShowExternal(false);
    }
  }, [isHomeRoute, isBlogsRoute, isResumeRoute, setShowExternal]);

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: enterDelay + i * 0.06,
        duration: 0.22,
        ease: "easeOut",
      },
    }),
  };

  const containerMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 10 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { delay: enterDelay, duration: 0.32, ease: "easeOut" },
      },
    }),
    [enterDelay],
  );

  const homeLinks = useMemo(
    () => ["About", "Projects", "Contact"] as const,
    [],
  );

  const navLinks = useMemo(() => {
    if (currentRoute === "Home") return null;

    if (isBlogsRoute) {
      return [
        { label: "Portfolio", href: "/" },
        { label: "Resume", href: "/resume" },
      ];
    }

    if (isResumeRoute) {
      return [
        { label: "Portfolio", href: "/" },
        { label: "Blogs", href: "/blogs" },
      ];
    }

    return [
      { label: "Portfolio", href: "/" },
      { label: "Blogs", href: "/blogs" },
      { label: "Resume", href: "/resume" },
    ];
  }, [currentRoute, isBlogsRoute, isResumeRoute]);

  const logoHref = useMemo(() => {
    if (isBlogsRoute) return "/blogs";
    if (isResumeRoute) return "/resume";
    return "/";
  }, [isBlogsRoute, isResumeRoute]);

  const logoLabel = useMemo(() => {
    if (isBlogsRoute) return "Blogs";
    if (isResumeRoute) return "Resume";
    return null;
  }, [isBlogsRoute, isResumeRoute]);

  return (
    <motion.nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-100/95 to-transparent dark:from-zinc-900/95" />
      <motion.div
        className="pointer-events-auto mx-auto flex w-fit max-w-[min(52rem,calc(100vw-2rem))] items-center gap-1.5 rounded-2xl border border-zinc-200/70 bg-white/70 p-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
        initial={containerMotion.initial}
        animate={containerMotion.animate}
      >
        <MotionLink
          href={logoHref}
          className={`relative flex h-10 shrink-0 items-center overflow-hidden rounded-xl bg-zinc-50 ring-1 ring-inset ring-black/10 transition-all duration-300 dark:bg-zinc-900 dark:ring-zinc-700/60 ${
            logoLabel ? "px-3" : "w-10 justify-center"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: enterDelay, duration: 0.2, ease: "easeOut" }}
        >
          <div className="relative h-6 w-6 shrink-0">
            <Image src={logo} alt="Ayush Rameja" fill className="object-contain" />
          </div>
          {logoLabel && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-2 flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              <span className="text-zinc-400">·</span>
              <span>{logoLabel}</span>
            </motion.div>
          )}
        </MotionLink>
        <div className="flex items-center gap-0.5 rounded-xl bg-zinc-950/5 p-1 ring-1 ring-inset ring-zinc-950/10 dark:bg-zinc-950/35 dark:ring-zinc-700/50">
          <div className="flex items-center gap-0.5">
            {currentRoute === "Home"
              ? homeLinks.map((link, i) => (
                <motion.a
                  key={link}
                  custom={i}
                  href={`/#${link.toLowerCase()}`}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  className={[
                    "group relative flex items-center justify-center overflow-hidden rounded-lg px-3 py-2 text-sm transition",
                    activeHomeSection === link.toLowerCase()
                      ? "bg-black/10 text-zinc-950 dark:bg-white/10 dark:text-zinc-50"
                      : "text-zinc-700 hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-zinc-50",
                  ].join(" ")}
                >
                  <StaggeredText text={link} />
                </motion.a>
              ))
              : (navLinks ?? []).map((link, i) => (
                <MotionLink
                  key={link.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                  className="group relative flex items-center justify-center overflow-hidden rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-zinc-50"
                  href={link.href}
                >
                  <StaggeredText text={link.label} />
                </MotionLink>
              ))}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {showExternal &&
            !isBlogsRoute &&
            !isResumeRoute &&
            ["Blogs", "Resume"].map((externalLink: string, i: number) => (
              <motion.div
                key={externalLink}
                custom={i}
                className="hidden sm:block"
                initial={{ opacity: 0, scale: 0.92, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.92, width: 0 }}
                transition={{ delay: i * 0.06, duration: 0.2, ease: "easeOut" }}
              >
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-black px-3 py-2 text-sm text-zinc-50 ring-1 ring-inset ring-black/10 transition hover:bg-zinc-950 dark:bg-black dark:text-zinc-200 dark:ring-zinc-700/60 dark:hover:bg-zinc-950/90 dark:hover:text-zinc-50"
                  href={externalLink === "Blogs" ? "/blogs" : "/resume"}
                >
                  {externalLink}
                </Link>
              </motion.div>
            ))}
        </AnimatePresence>
        <div className="ml-1 flex items-center">
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Nav;
