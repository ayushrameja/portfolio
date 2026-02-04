"use client";

import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/types/IProject";
import { projects } from "@/utils/projectData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { THEME_CHANGE_EVENT } from "@/utils/storm";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [prevName, setPrevName] = useState("");
  const [prevEmail, setPrevEmail] = useState("");
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

    if (name === prevName && email === prevEmail && message === prevMessage) {
      setIsDisabled(true);
    } else {
      setPrevName(name);
      setPrevEmail(email);
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

  const handleEmailChange = (value: string) => {
    setEmail(value);
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
    window.addEventListener(THEME_CHANGE_EVENT, apply as EventListener);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, apply as EventListener);
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
          <div className="absolute inset-0 bg-linear-to-b from-white via-zinc-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950" />
          <div
            className="absolute inset-0 opacity-[0.55] dark:opacity-[0.28]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(24,24,27,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(24,24,27,0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="absolute inset-0 bg-radial from-fuchsia-500/18 via-transparent to-transparent blur-3xl dark:from-fuchsia-400/10" />
          <div className="absolute right-[-20%] top-[-20%] h-[520px] w-[520px] rounded-full bg-radial from-violet-500/16 via-transparent to-transparent blur-3xl dark:from-violet-400/10" />
          <div className="absolute left-[-15%] bottom-[-25%] h-[560px] w-[560px] rounded-full bg-radial from-cyan-500/12 via-transparent to-transparent blur-3xl dark:from-cyan-400/8" />
          <div className="absolute inset-0 bg-linear-to-t from-white/85 via-transparent to-white/85 dark:from-zinc-950/90 dark:to-zinc-950/90" />
        </div>
        <motion.div
          className="mx-auto w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
	          <div className="flex flex-col items-center text-center">
	            <motion.div variants={itemVariants} className="w-full max-w-3xl">
	              <div className="inline-flex flex-wrap items-center justify-center gap-2">
	                <span className="inline-flex items-center rounded-full border border-zinc-200/70 bg-white/60 px-4 py-2 text-xs font-semibold tracking-widest text-zinc-700 backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200">
	                  PRODUCT · UI · SYSTEMS
	                </span>
	              </div>
	              <h1 className="mt-8 text-6xl font-semibold tracking-tight text-zinc-950 sm:text-7xl dark:text-zinc-50">
		                Ayush Rameja
		                <span className="relative mt-4 block text-2xl font-semibold tracking-tight sm:text-3xl">
		                  <span className="bg-linear-to-r from-fuchsia-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent dark:from-fuchsia-300 dark:via-violet-300 dark:to-cyan-300">
		                    Software engineer
		                  </span>
		                  <span className="text-zinc-950 dark:text-zinc-50"> who ships end to end.</span>
	                  <span
	                    aria-hidden
	                    className="pointer-events-none absolute left-1/2 top-full h-px w-44 -translate-x-1/2 bg-linear-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/70"
	                  />
	                </span>
	              </h1>

	              <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
		                I build web products across UI, APIs, and data. I try to keep the code clean, the UX calm, and the
		                systems boring in the best way.
	              </p>

	              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
	                <Link
	                  href="#projects"
	                  className="inline-flex w-full items-center justify-center rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-50 shadow-[0_20px_65px_-45px_rgba(0,0,0,0.45)] transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25 sm:w-auto dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
	                >
	                  See selected work
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-900 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/25 sm:w-auto dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-50 dark:hover:bg-zinc-950/45"
	                >
	                  Let&apos;s talk
	                </Link>
	              </div>
	            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 w-full">
              <div className="relative mx-auto w-full max-w-5xl">
                <div className="pointer-events-none absolute -inset-10 -z-10 opacity-70">
                  <div className="absolute inset-0 rounded-[44px] bg-linear-to-br from-fuchsia-500/12 via-violet-500/8 to-cyan-500/12 blur-2xl dark:from-fuchsia-400/10 dark:via-violet-400/7 dark:to-cyan-400/9" />
                </div>

	                <div className="overflow-hidden rounded-[40px] border border-zinc-200/70 bg-white/60 shadow-[0_26px_80px_-60px_rgba(0,0,0,0.22)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_26px_80px_-60px_rgba(0,0,0,0.85)]">
	                  <div className="flex items-center justify-between border-b border-zinc-200/70 bg-white/40 px-6 py-4 dark:border-zinc-700/60 dark:bg-zinc-950/25">
	                    <div className="flex items-center gap-2" aria-hidden>
	                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
	                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
	                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
	                    </div>
	                    <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">PORTFOLIO</p>
	                    <div className="w-[52px]" aria-hidden />
	                  </div>

	                  <div className="grid gap-0 lg:grid-cols-12">
	                    <div className="lg:col-span-7">
	                      <div className="p-6 text-left sm:p-8">
	                        <div className="mt-5 overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/60 shadow-[0_18px_55px_-45px_rgba(0,0,0,0.18)] backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:shadow-[0_18px_55px_-45px_rgba(0,0,0,0.8)]">
	                          <div className="relative h-[320px] w-full sm:h-[360px] lg:h-[420px]">
	                            <Image
	                              src="/assets/image/profile.png"
	                              alt="Ayush Rameja"
	                              fill
	                              priority
	                              className="object-cover"
	                            />
	                            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/55 via-zinc-950/10 to-transparent dark:from-zinc-950/70" />

		                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
		                              <div className="flex flex-wrap items-end justify-between gap-4">
		                                <div className="min-w-0">
		                                  <p className="text-sm font-semibold text-zinc-50">Ayush Rameja</p>
		                                  <p className="mt-1 text-sm text-zinc-200/90">
		                                    <span className="font-semibold text-zinc-50">Software Engineer</span> at{" "}
		                                    <Link
		                                      href="https://www.autodesk.com"
		                                      target="_blank"
		                                      rel="noopener noreferrer"
		                                      className="font-semibold text-zinc-50 underline decoration-white/20 underline-offset-4 transition hover:decoration-white/50"
		                                    >
		                                      Autodesk
		                                    </Link>
		                                  </p>
		                                  <p className="mt-1 text-sm text-zinc-200/90">
		                                    Building web products across UI, APIs, and data
		                                  </p>
		                                </div>
	                              </div>
	                            </div>
	                          </div>
	                        </div>
	                      </div>
	                    </div>

	                    <div className="border-t border-zinc-200/70 lg:col-span-5 lg:border-l lg:border-t-0 dark:border-zinc-700/60">
	                      <div className="flex h-full flex-col p-6 sm:p-8">
		                        <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
		                          QUICK LINKS
		                        </p>
	                        <div className="mt-5 grid gap-3">
                          <Link
                            href="/resume"
                            className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                          >
                            Resume
                            <span className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400" aria-hidden>
                              ↗
                            </span>
                          </Link>
                          <Link
                            href="/blogs"
                            className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                          >
                            Blogs
                            <span className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400" aria-hidden>
                              ↗
                            </span>
                          </Link>
                          <Link
                            href="#contact"
                            className="group flex items-center justify-between rounded-3xl border border-zinc-200/70 bg-white/65 px-5 py-4 text-sm font-semibold text-zinc-900 transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
	                          >
	                            Contact
	                            <span className="text-zinc-500 transition group-hover:translate-x-0.5 dark:text-zinc-400" aria-hidden>
                                ↗
	                            </span>
	                          </Link>
		                        </div>
		                        <div className="mt-auto rounded-3xl border border-zinc-200/70 bg-white/55 p-6 text-left backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-950/20">
		                          <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
		                            WHAT I DO
		                          </p>
	                          <ul className="mt-4 grid gap-3 text-sm text-zinc-700 dark:text-zinc-200">
	                            <li className="flex gap-3">
	                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500/80 dark:bg-fuchsia-400/70" />
	                              Build clean, scalable frontends
	                            </li>
	                            <li className="flex gap-3">
	                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500/70 dark:bg-violet-400/60" />
	                              Ship APIs and services that hold up
	                            </li>
		                            <li className="flex gap-3">
		                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70 dark:bg-cyan-400/60" />
		                              Keep performance and DX honest
		                            </li>
		                          </ul>
		                        </div>
		                      </div>
		                    </div>
	                  </div>
	                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-3 rounded-full border border-zinc-200/70 bg-white/65 px-5 py-2.5 text-sm font-semibold text-zinc-800 backdrop-blur transition hover:bg-white dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200 dark:hover:bg-zinc-950/45"
              >
                Scroll
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200/70 bg-white/70 text-zinc-700 transition group-hover:translate-y-0.5 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-200">
                  ↓
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <div className="px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
        </div>
      </div>

      <section id="projects" className="px-6 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Selected work</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                A few projects that highlight my role, skills, and impact.
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-10">
            {projects.map((project: IProject) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/60 p-8 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.22)] backdrop-blur transition-all duration-300 hover:border-zinc-300/80 hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.26)] dark:border-zinc-700/60 dark:bg-zinc-900/30 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.7)] dark:hover:border-zinc-600/70 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.85)]"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl dark:bg-fuchsia-400/10" />
                  <div className="absolute -bottom-32 -left-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/8" />
                </div>

                <div className="relative grid gap-8 lg:grid-cols-12 lg:items-start">
                  <div className="min-w-0 lg:col-span-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-zinc-200/70 bg-zinc-950/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300">
                          {project.client}
                        </span>
                        <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-fuchsia-400/10 dark:text-fuchsia-200">
                          {project.role}
                        </span>
                      </div>

                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 bg-white/40 px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-white/60 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-100 dark:hover:bg-zinc-950/35"
                        >
                          <span>See more</span>
                          <span aria-hidden className="text-zinc-500 dark:text-zinc-400">
                            ↗
                          </span>
                        </Link>
                      )}
                    </div>

                    <h3 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {project.name}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 lg:border-l lg:border-zinc-200/70 lg:pl-8 dark:lg:border-zinc-700/60">
                    <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400">
                      HIGHLIGHTS
                    </p>

	                    <ul className="mt-5 space-y-4">
	                      {project.points.map((point: string, index: number) => (
	                        <li key={index} className="flex gap-4">
	                          <span
	                            aria-hidden
	                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-500 dark:bg-fuchsia-300"
	                          />
	                          <span className="text-base leading-7 text-zinc-700 dark:text-zinc-200">{point}</span>
	                        </li>
	                      ))}
	                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-cover bg-center shadow-[0_28px_90px_-70px_rgba(0,0,0,0.25)] dark:border-zinc-700/60 dark:shadow-[0_28px_90px_-70px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 bg-linear-to-tr from-white/92 via-white/70 to-white/40 dark:from-zinc-950/90 dark:via-zinc-950/60 dark:to-zinc-950/25" />
            <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-70">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-500/16 blur-3xl dark:bg-fuchsia-400/12" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-violet-500/14 blur-3xl dark:bg-violet-400/10" />
            </div>

            <div className="relative p-8 md:p-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-300/80">CONTACT</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                  Ping me <span className="text-fuchsia-700 dark:text-fuchsia-200">let&apos;s build something</span>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-200/85">
                  Short message is perfect. I usually reply fast (assuming Slack isn&apos;t on fire).
                </p>
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-stretch">
                <div className="lg:col-span-7">
                  <div className="h-full rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.18)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.85)]">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
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
                          className="mt-2 w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          required
                          placeholder="you@domain.com"
                          className="mt-2 w-full rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          value={message}
                          onChange={(e) => handleMessageChange(e.target.value)}
                          required
                          placeholder="What are you building, and what do you need help with?"
                          className="mt-2 h-36 w-full resize-none rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-400 transition focus:border-fuchsia-500/60 focus:ring-2 focus:ring-fuchsia-500/15 dark:border-zinc-700/60 dark:bg-zinc-950/35 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-fuchsia-400/60 dark:focus:ring-fuchsia-400/20"
                        />
                      </div>

                      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-zinc-600 dark:text-zinc-300/80">
                          Prefer email?{" "}
                          <Link
                            href="mailto:ayushrameja@gmail.com"
                            className="font-semibold text-zinc-950 underline decoration-zinc-900/15 underline-offset-4 transition hover:decoration-zinc-900/35 dark:text-zinc-50 dark:decoration-white/20 dark:hover:decoration-white/50"
                          >
                            ayushrameja@gmail.com
                          </Link>
                        </p>
                        <button
                          type="submit"
                          disabled={isDisabled || isSubmitted}
                          className="inline-flex items-center justify-center rounded-2xl bg-linear-to-r from-fuchsia-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_-32px_rgba(236,72,153,0.55)] transition enabled:hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/30 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-[0_18px_55px_-32px_rgba(236,72,153,0.75)] dark:focus-visible:ring-fuchsia-400/30"
                        >
                          {isSubmitted ? "Sent" : "Send"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="grid gap-8 lg:col-span-5">
                  <div className="rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.16)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.8)]">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Links</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300/85">
                      Stalk professionally. Please do not open a Jira ticket about my personality.
                    </p>

                    <div className="mt-5 grid gap-3">
                      <Link
                        href="mailto:ayushrameja@gmail.com"
                        className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                      >
                        <span>Mail</span>
                        <span className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" aria-hidden>
                          ↗
                        </span>
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/ayushrameja/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                      >
                        <span>LinkedIn</span>
                        <span className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" aria-hidden>
                          ↗
                        </span>
                      </Link>
                      <Link
                        href="https://github.com/ayushrameja"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-950/5 px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-950/8 dark:border-zinc-700/60 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
                      >
                        <span>GitHub</span>
                        <span className="text-zinc-500 transition group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200" aria-hidden>
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-zinc-200/70 bg-white/65 p-8 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.16)] backdrop-blur dark:border-white/10 dark:bg-zinc-950/35 dark:shadow-[0_24px_70px_-55px_rgba(0,0,0,0.8)]">
                    <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">What I&apos;m Great At</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-800 dark:border-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-100">
                        Shipping UI polish
                      </span>
                      <span className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-200">
                        Product-minded engineering
                      </span>
                      <span className="rounded-full border border-zinc-200/70 bg-white/40 px-3 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-700/60 dark:bg-zinc-950/25 dark:text-zinc-200">
                        Performance & DX
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 to-transparent dark:via-zinc-700/60" />
          <div className="mt-6 flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Ayush Rameja. All rights reserved.</p>
            <p className="text-zinc-500 dark:text-zinc-400">Code licensed under Apache License 2.0.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
