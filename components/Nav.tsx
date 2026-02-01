"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/store";
import StaggeredText from "@/components/StaggerText";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const MotionLink = motion.create(Link);

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
    <motion.nav className="nav">
      <motion.div
        className="nav__wrapper"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionLink
          href="/"
          className="nav__wrapper__logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1>AXU</h1>
        </MotionLink>
        <div className="nav__wrapper__links">
          <div className="nav__wrapper__links__wrapper">
            {currentRoute === "Home"
              ? ["About", "Projects", "Contact"].map((link, i) => (
                  <motion.a
                    key={link}
                    custom={i}
                    href={`/#${link.toLowerCase()}`}
                    initial="hidden"
                    animate="visible"
                    variants={linkVariants}
                    className="nav__wrapper__links__wrapper__link"
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
                      className="nav__wrapper__links__wrapper__link"
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
            className="nav__wrapper__external"
            initial={{ opacity: 0, height: 0, padding: 0, width: 0 }}
            animate={
              showExternal
                ? {
                    opacity: 1,
                    height: "auto",
                    width: "auto",
                    marginLeft: "0.5vw",
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
              className={`${externalLink.toLocaleLowerCase()}-link`}
              href={externalLink === "Blogs" ? "/blogs" : "/resume"}
            >
              {externalLink}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Nav;
