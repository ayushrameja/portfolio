"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";
import StaggeredText from "@/components/StaggerText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const MotionLink = motion.create(Link);

const Nav = () => {
  const pathname = usePathname();

  const showExternal = useAppStore((state) => state.showExternal);
  const currentRoute = useAppStore((state) => state.currentRoute);
  const setShowExternal = useAppStore((state) => state.setShowExternal);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowExternal(true);
      } else {
        setShowExternal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowExternal]);

  useEffect(() => {
    if (pathname === "/") {
      setShowExternal(false);
    }
  }, [pathname, setShowExternal]);

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.1,
      },
    }),
  };

  return (
    <motion.nav className="fixed inset-x-0 bottom-0 z-50 pb-6 pt-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-100/95 to-transparent dark:from-zinc-900/95" />
      <motion.div
        className="pointer-events-auto mx-auto flex w-fit max-w-[min(52rem,calc(100vw-2rem))] items-center gap-2 rounded-2xl border border-zinc-200/70 bg-white/70 p-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionLink
          href="/"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-sm font-semibold tracking-wide text-zinc-50 ring-1 ring-inset ring-zinc-950/10 dark:bg-zinc-950/50 dark:ring-zinc-700/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          AXU
        </MotionLink>
        <div className="flex items-center gap-1 rounded-xl bg-zinc-950/5 p-1 ring-1 ring-inset ring-zinc-950/10 dark:bg-zinc-950/35 dark:ring-zinc-700/50">
          <div className="flex items-center gap-1">
            {currentRoute === "Home"
              ? ["About", "Projects", "Contact"].map((link, i) => (
                  <motion.a
                    key={link}
                    custom={i}
                    href={`/#${link.toLowerCase()}`}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    className="group relative rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-zinc-50"
                  >
                    <StaggeredText text={link} />
                  </motion.a>
                ))
              : ["Portfolio", "Blogs", "Resume"].map(
                  (link: string, i: number) => (
                    <MotionLink
                      key={link}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={linkVariants}
                      className="group relative rounded-lg px-3 py-2 text-sm text-zinc-700 transition hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-200 dark:hover:bg-white/5 dark:hover:text-zinc-50"
                      href={link === "Portfolio" ? "/" : `/${link.toLowerCase()}`}
                    >
                      <StaggeredText text={link} />
                    </MotionLink>
                  )
                )}
          </div>
        </div>
        {["Blogs", "Resume"].map((externalLink: string, i: number) => (
          <motion.div
            key={externalLink}
            custom={i}
            className="hidden sm:block"
            initial={{ opacity: 0, height: 0, padding: 0, width: 0 }}
            animate={
              showExternal
                ? {
                    opacity: 1,
                    height: "auto",
                    width: "auto",
                    marginLeft: "0.25rem",
                    y: 0,
                  }
                : {
                    opacity: 0,
                    height: 0,
                    padding: 0,
                    width: 0,
                    marginLeft: 0,
                    y: 10,
                  }
            }
            transition={{ delay: i * 0.1 + 0.3 }}
            style={{ pointerEvents: showExternal ? "auto" : "none" }}
          >
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-3 py-2 text-sm text-zinc-50 ring-1 ring-inset ring-zinc-950/10 transition hover:bg-black dark:bg-zinc-950/50 dark:text-zinc-200 dark:ring-zinc-700/60 dark:hover:bg-zinc-950/70 dark:hover:text-zinc-50"
              href={externalLink === "Blogs" ? "/blogs" : "/resume"}
            >
              {externalLink}
            </Link>
          </motion.div>
        ))}
        <div className="ml-1">
          <ThemeToggle />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Nav;
