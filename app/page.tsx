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

      <section id="about" className="relative px-6 pt-10">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 via-zinc-100/70 to-zinc-100 dark:from-zinc-950 dark:via-zinc-950/70 dark:to-zinc-950" />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute left-1/2 top-10 h-[520px] w-[min(1200px,120vw)] -translate-x-1/2 rounded-[3rem] object-cover opacity-[0.14] blur-[1px] saturate-150 dark:opacity-[0.18]"
            aria-hidden="true"
          >
            <source src="/assets/video/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-100 via-transparent to-transparent dark:from-zinc-950" />
        </div>
        <motion.div
          className="mx-auto w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:auto-rows-fr lg:items-stretch">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 rounded-3xl border border-zinc-200/70 bg-white/70 p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/40 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="shrink-0">
                  <Image
                    src="/assets/image/profile.png"
                    alt="Ayush Rameja"
                    width={160}
                    height={160}
                    priority
                    className="h-24 w-24 rounded-2xl object-cover ring-1 ring-inset ring-zinc-200/70 md:h-32 md:w-32 dark:ring-zinc-700/60"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400">
                    SOFTWARE ENGINEER
                  </p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
                    Ayush Rameja
                  </h1>
                  <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                    Blending design and function to craft engaging experiences that simplify complexity and surpass
                    expectations.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                      Siemens
                    </span>
                    <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                      Full‑stack
                    </span>
                    <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                      Design‑minded
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-4 lg:row-span-2 flex h-full flex-col rounded-3xl border border-zinc-200/70 bg-white/60 p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.18)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_20px_60px_-40px_rgba(0,0,0,0.6)]"
            >
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">About</h2>
              <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-300">
                <p>
                  CS Engineer turned software developer with a flair for design — I like building products that feel
                  fast, intentional, and friendly.
                </p>
                <p>
                  4+ years turning ideas into shipped web experiences for teams like Google, CHUBB, Siemens, and
                  Coinnection.
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-zinc-200/70 bg-zinc-950/5 p-4 dark:border-zinc-700/60 dark:bg-zinc-950/25">
                <p className="text-xs font-medium tracking-wider text-zinc-500 dark:text-zinc-400">PREVIOUSLY</p>
                <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                  Full stack developer at Accenture AI (prev. Bridgei2i)
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-4">
              <Link
                href="/resume"
                className="group relative block h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-[url('/assets/image/resume-bg.png')] bg-cover bg-center p-7 text-zinc-50 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.45)] transition hover:border-zinc-300 dark:border-zinc-700/60 dark:hover:border-zinc-600/60"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-950/85 via-zinc-950/35 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-semibold text-fuchsia-200">Resume</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">Download PDF</p>
                  <p className="mt-2 text-sm text-zinc-200/90">A quick overview of my experience and impact.</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-50">
                    Open
                    <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-4">
              <Link
                href="/blogs"
                className="group relative block h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-[url('/assets/image/blogs-bg.png')] bg-cover bg-center p-7 text-zinc-50 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.45)] transition hover:border-zinc-300 dark:border-zinc-700/60 dark:hover:border-zinc-600/60"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-950/85 via-zinc-950/35 to-transparent" />
                <div className="relative">
                  <p className="text-sm font-semibold text-sky-200">Blogs</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">Notes &amp; writeups</p>
                  <p className="mt-2 text-sm text-zinc-200/90">Thoughts on product, engineering, and UI polish.</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-50">
                    Explore
                    <span className="transition group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

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
