"use client";

import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/types/IProject";
import { projects } from "@/utils/projectData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [prevName, setPrevName] = useState("");
  const [prevMessage, setPrevMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === prevName && message === prevMessage) {
      setIsDisabled(true);
    } else {
      setPrevName(name);
      setPrevMessage(message);
      setIsSubmitted(true);
      setIsDisabled(false);

      toast.info(`Thanks for the message, ${name}!`);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setIsSubmitted(false);
    setIsDisabled(false);
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    setIsSubmitted(false);
    setIsDisabled(false);
  };

  const [toastTheme, setToastTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const apply = () => {
      setToastTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    apply();
    window.addEventListener("theme-change", apply as EventListener);
    return () => window.removeEventListener("theme-change", apply as EventListener);
  }, []);

  return (
    <main className="min-h-dvh pb-28">
      <ToastContainer
        position="bottom-right"
        theme={toastTheme}
        toastClassName="!rounded-xl !border !border-zinc-200/70 !bg-white !text-zinc-900 !shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] dark:!border-zinc-700/60 dark:!bg-zinc-800 dark:!text-zinc-100 dark:!shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
        progressClassName="!bg-fuchsia-500 dark:!bg-fuchsia-400"
        closeButton={false}
      />

      <section id="about" className="relative flex min-h-screen items-center px-6 py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-200 via-zinc-100/70 to-zinc-200 dark:from-zinc-950 dark:via-zinc-950/80 dark:to-zinc-950" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.06] blur-[1px] saturate-150 dark:opacity-[0.12]"
            aria-hidden="true"
          >
            <source src="/assets/video/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-200/95 via-zinc-100/25 to-zinc-200/95 dark:from-zinc-950/95 dark:via-zinc-950/40 dark:to-zinc-950/95" />
        </div>
        <motion.div
          className="mx-auto w-full max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:items-stretch">
            <motion.div
              variants={itemVariants}
              className="md:col-span-1 lg:col-span-8 lg:row-span-1 lg:self-start rounded-3xl border border-zinc-300/60 bg-white/70 p-8 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.22)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.26)] dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_20px_70px_-30px_rgba(0,0,0,0.9)]"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-inset ring-zinc-200/70 transition-all duration-300 hover:ring-zinc-300 md:h-auto md:w-44 dark:ring-zinc-700/60 dark:hover:ring-zinc-600">
                  <Image src="/assets/image/profile.png" alt="Ayush Rameja" fill priority className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
                    SOFTWARE ENGINEER
                  </p>
                  <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                    Ayush Rameja
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                    I build fast, thoughtful web experiences and I care a lot about the small details that make products
                    feel good to use.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-zinc-950/5 px-4 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur transition-colors hover:bg-zinc-950/10 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300 dark:hover:bg-zinc-950/35">
                      Autodesk
                    </span>
                    <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-zinc-950/5 px-4 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur transition-colors hover:bg-zinc-950/10 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300 dark:hover:bg-zinc-950/35">
                      Full‑stack
                    </span>
                    <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-zinc-950/5 px-4 py-1.5 text-sm font-medium text-zinc-700 backdrop-blur transition-colors hover:bg-zinc-950/10 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300 dark:hover:bg-zinc-950/35">
                      Design‑minded
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="md:col-span-1 lg:col-span-4 lg:row-span-2 flex h-full flex-col rounded-3xl border border-zinc-300/60 bg-white/65 p-8 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.22)] dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_20px_70px_-30px_rgba(0,0,0,0.75)]"
            >
              <div>
                <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">About</h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <p>
                    I’m a software engineer at Autodesk. I enjoy building products that feel simple on the surface but
                    are carefully engineered underneath.
                  </p>
                  <p>
                    I’ve spent the last few years shipping web experiences for teams across different domains, and I’m
                    happiest when I can collaborate closely with design and iterate quickly with real feedback.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                    React
                  </span>
                  <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                    Next.js
                  </span>
                  <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                    Design systems
                  </span>
                  <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                    Motion
                  </span>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-zinc-200/70 bg-zinc-950/5 p-5 backdrop-blur transition-colors hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:hover:bg-zinc-950/35">
                <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">PREVIOUSLY</p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
                  Full stack developer at Accenture AI (prev. Bridgei2i)
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-4 lg:row-span-1">
              <Link
                href="/resume"
                className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-3xl border border-zinc-300/60 bg-white/65 p-8 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.22)] dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] dark:hover:border-zinc-600/70 dark:hover:shadow-[0_25px_70px_-30px_rgba(0,0,0,0.75)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-80 dark:bg-fuchsia-400/12" />
                  <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-80 dark:bg-violet-400/12" />
                </div>
                <div className="pointer-events-none absolute right-5 top-5 opacity-25 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:opacity-35 dark:opacity-20 dark:group-hover:opacity-30">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-200">Resume</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Download PDF</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    A quick overview of my experience and impact.
                  </p>
                </div>
                <div className="relative mt-auto pt-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                      PDF
                    </span>
                    <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200">
                      Feb 2026
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-50 transition-all hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white">
                    Open
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-4 lg:row-span-1">
              <Link
                href="/blogs"
                className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-3xl border border-zinc-300/60 bg-white/65 p-8 shadow-[0_20px_60px_-42px_rgba(0,0,0,0.18)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_24px_70px_-32px_rgba(0,0,0,0.22)] dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)] dark:hover:border-zinc-600/70 dark:hover:shadow-[0_25px_70px_-30px_rgba(0,0,0,0.75)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-80 dark:bg-cyan-400/12" />
                  <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl transition-opacity duration-300 group-hover:opacity-80 dark:bg-blue-400/12" />
                </div>
                <div className="pointer-events-none absolute right-5 top-5 opacity-25 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-35 dark:opacity-20 dark:group-hover:opacity-30">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>
                <div className="relative">
                  <p className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-200">Blogs</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">Notes &amp; writeups</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Thoughts on product, engineering, and UI polish.
                  </p>
                </div>
                <div className="relative mt-auto pt-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                      Writing
                    </span>
                    <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-200">
                      UI
                    </span>
                    <span className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200">
                      Eng
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-50 transition-all hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white">
                    Explore
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        </div>
      </div>

      <section id="projects" className="px-6 pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Selected work</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                A few projects that highlight my role, skills, and impact.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {projects.map((project: IProject) => (
              <div
                key={project.id}
                className="rounded-3xl border border-zinc-200/70 bg-white/60 p-7 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.18)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_20px_60px_-50px_rgba(0,0,0,0.65)]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                        {project.client}
                      </span>
                      <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200">
                        {project.role}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.skills.join(" · ")}</p>
                  </div>

                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-50 transition hover:bg-black dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
                    >
                      See more
                    </Link>
                  )}
                </div>

                <ul className="mt-6 grid gap-3 text-zinc-800 dark:text-zinc-200">
                  {project.points.map((point: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500 dark:bg-fuchsia-300" />
                      <span className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-10 pt-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-[url('/assets/image/contact-background.png')] bg-cover bg-center dark:border-zinc-700/60">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/85 via-zinc-950/55 to-zinc-950/20" />
            <div className="relative grid gap-6 p-7 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
                  Ping me <span className="text-fuchsia-200">let&apos;s build something</span>
                </h2>
                <p className="mt-2 text-zinc-300">Short message is perfect. I usually reply fast.</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-zinc-200">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-zinc-700/60 bg-zinc-950/35 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-500/70"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-zinc-200">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      required
                      placeholder="What are you building?"
                      className="mt-2 h-32 w-full resize-none rounded-xl border border-zinc-700/60 bg-zinc-950/35 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-500/70"
                    />
                  </div>

                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isDisabled || isSubmitted}
                      className="inline-flex items-center justify-center rounded-xl bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-900 transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitted ? "Sent" : "Send"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-zinc-700/60 bg-zinc-950/35 p-6">
                  <h3 className="text-lg font-semibold text-zinc-50">Links</h3>
                  <div className="mt-4 grid gap-3">
                    <Link
                      href="mailto:ayushrameja@gmail.com"
                      className="rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"
                    >
                      Mail
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/ayushrameja/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="https://github.com/RamejaAyush"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-zinc-700/60 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"
                    >
                      GitHub
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
