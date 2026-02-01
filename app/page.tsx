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

  useEffect(() => {
    if (name !== prevName || message !== prevMessage) {
      setIsSubmitted(false);
      setIsDisabled(false);
    }
  }, [name, message, prevName, prevMessage]);

  return (
    <div className="w-full h-full min-h-screen">
      <ToastContainer theme="dark" toastClassName="custom-toast" />
      
      <div id="about" className="w-full h-screen p-[2dvw]">
        <motion.div
          className="flex flex-col gap-[2vh] w-full h-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-[70%] w-full flex gap-[var(--gap)]">
            <motion.div
              variants={itemVariants}
              className="w-[65%] h-full flex flex-col gap-[var(--gap)]"
            >
              <div className="w-full h-1/2 flex gap-[4vh] p-[var(--gap)] rounded-[2.5dvw] bg-[var(--light-black)]">
                <div className="w-[20%] p-[0.5dvw]">
                  <Image
                    src="/assets/image/profile.png"
                    alt="Ayush Rameja"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                </div>
                <div className="w-[80%] flex flex-col gap-[var(--gap)] justify-center">
                  <div>
                    <p className="text-[1.75dvw]">I&apos;m Ayush Rameja,</p>
                    <p className="text-[1.75dvw]">
                      Software Engineer at <span className="bold">Siemens</span>
                    </p>
                  </div>
                  <div className="text-[1.5dvw]">
                    <p>
                      Blending design and function to craft engaging experiences
                      that simplify complexity and surpass expectations.
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.div
                variants={itemVariants}
                className="w-full h-1/2 flex gap-[2vh]"
              >
                <div className="home__landing__wrapper__content__introduction__cta__projects w-1/2 h-full text-[var(--dull-white)] rounded-[var(--rounded)] bg-[var(--light-black)]">
                  <Link href="/resume" className="no-underline block h-full">
                    <div className="w-full h-[25%] flex items-center px-[2dvw] text-[var(--mint)] font-[var(--font-neue-medium)]">
                      <p className="text-[1.5dvw]">Resume</p>
                    </div>
                    <div className="w-full h-[75%] flex justify-end">
                      <div className="w-[90%] h-full bg-[var(--black)] rounded-tl-[var(--rounded)] rounded-br-[var(--rounded)]">
                        <div className="w-full h-full pl-[2.5dvw]">
                          <div className="w-full h-[70%] flex items-center pl-[1dvw]">
                            <p className="text-[2dvw] text-[var(--mint)] font-[var(--font-neue-medium)]">
                              Google AIRP Cx
                            </p>
                          </div>
                          <div className="w-full h-[30%] bg-[var(--dull-mint)] rounded-tl-[var(--rounded)] rounded-br-[var(--rounded)]"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                
                <div className="home__landing__wrapper__content__introduction__cta__blogs w-1/2 h-full text-[var(--dull-white)] rounded-[var(--rounded)] bg-[var(--light-black)]">
                  <Link href="/blogs" className="no-underline block h-full">
                    <div className="w-full h-[25%] flex items-center px-[2dvw] text-[var(--purple)] font-[var(--font-neue-medium)]">
                      <p className="text-[1.5dvw]">Blogs</p>
                    </div>
                    <div className="w-full h-[75%] flex justify-end">
                      <div className="w-[90%] h-full bg-[var(--black)] rounded-tl-[var(--rounded)] rounded-br-[var(--rounded)]">
                        <div className="w-full h-full pl-[2.5dvw]">
                          <div className="w-full h-[70%] flex items-center pl-[1dvw]">
                            <p className="flex gap-[var(--gap)] text-[1.75dvw] text-[var(--purple)] font-[var(--font-neue-medium)]">
                              <span className="text-[2dvw] font-[var(--font-trade-winds)]">AXU</span>
                              <span className="flex items-center px-[2dvw] text-[1.25dvw] rounded-[1dvw] text-[var(--black)] bg-[var(--purple)] font-[var(--font-neue-roman)]">
                                Blogs
                              </span>
                            </p>
                          </div>
                          <div className="w-full h-[30%] bg-[var(--dull-purple)] rounded-tl-[var(--rounded)] rounded-br-[var(--rounded)]"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="w-[35%] h-full p-[3dvw] flex flex-col justify-between text-[var(--dull-white)] rounded-[var(--rounded)] bg-[var(--light-black)]"
            >
              <div className="flex flex-col gap-[2vh]">
                <p className="text-[1.5dvw] leading-[3.5vh]">
                  I&apos;m a CS Engineer turned software developer with a{" "}
                  <span className="bold">
                    flair for design, creating seamless digital experiences.
                  </span>
                </p>
                <p className="text-[1.5dvw] leading-[3.5vh]">
                  With 4+ years in turning ideas into slick websites, blending
                  code with creativity.
                </p>
                <p className="text-[1.5dvw] leading-[3.5vh]">
                  Worked with giants like Google, CHUBB, Siemens, and
                  Coinnection, making designs that stand out.
                </p>
              </div>
              <div className="flex flex-col gap-[2vh]">
                <p className="text-[1.25dvw] font-[var(--font-neue-medium)]">PREVIOUSLY</p>
                <p className="text-[1.5dvw] leading-[4vh]">
                  Worked as a full stack developer at Accenture AI (prev.
                  Bridgei2i)
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="h-[30%] w-full flex items-center justify-center rounded-[var(--rounded)] bg-[var(--light-black)]"
          >
            <video autoPlay muted loop className="w-full h-full object-cover rounded-[var(--rounded)]">
              <source src="/assets/video/bg-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>
      
      <div id="projects" className="w-full h-full min-h-screen px-[4dvw]">
        <div className="w-full h-[10vh] flex items-center">
          <p className="text-[2dvw]">
            Behind the Code: <span className="gradient">My Story</span>
          </p>
        </div>
        <div className="w-full h-full min-h-screen">
          {projects.map((project: IProject) => (
            <div
              className="w-full h-screen flex py-[2vh]"
              key={project.id}
            >
              <div className="w-[30%] h-full">
                <div className="home__projects__container__project__client__wrapper w-[80%] h-[50vh] flex items-center justify-center rounded-[4dvw]">
                  <h1 className="rotate-[-90deg] text-[#dd00ff] text-[3.75dvw] font-[var(--font-neue-medium)]">
                    {project.client}
                  </h1>
                </div>
              </div>
              <div className="w-[70%] h-full">
                <div className="w-full h-[10%] flex items-center">
                  <h1 className="text-[4dvw] text-[#dd00ff] font-[var(--font-neue-medium)]">
                    {project.name}
                  </h1>
                </div>
                <div className="w-full h-[5%] flex items-center">
                  <p className="text-[1.5dvw]">{project.role}</p>
                </div>
                <div className="w-full h-[5%] flex items-center">
                  <p className="text-[1.5dvw]">{project.skills.join(", ")}</p>
                </div>
                <div className="w-full h-1/2 p-4">
                  <ul className="flex flex-col justify-between gap-[2vh]">
                    {project.points.map((point: string, index: number) => (
                      <li key={index} className="text-[1.5dvw] font-[var(--font-neue-light)] leading-[4vh]">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="project-cta w-full h-[20%] flex items-center">
                  {project.link && (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      See More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div id="contact" className="home__contact w-full h-screen grid place-items-center">
        <div className="flex gap-[1dvw] w-[60%] h-[60%]">
          <div className="contact__wrapper__form w-[70%] h-full">
            <div className="h-[15%] w-full">
              <h1 className="text-[2dvw] font-[var(--font-neue-bold)]">
                Ping Me, <span className="gradient-pink">Let&apos;s Make Magic</span>
              </h1>
            </div>
            <div className="w-full h-[85%]">
              <form onSubmit={handleSubmit} className="w-full h-full flex flex-col justify-between">
                <div className="w-full h-[25%] flex flex-col gap-[1vh] py-[1dvw] justify-center">
                  <label htmlFor="name" className="text-[1.5dvw]">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Please enter your name… if you dare."
                    className="p-[1dvw] outline-none text-black text-[1.25dvw] rounded-[0.25dvw] bg-white font-[var(--font-neue-medium)]"
                  />
                </div>
                <div className="w-full h-[55%] flex flex-col gap-[1vh] py-[1dvw]">
                  <label htmlFor="message" className="text-[1.5dvw] w-full h-[20%]">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Say something smart or funny, no pressure."
                    className="w-full h-[80%] resize-none p-[1dvw] outline-none text-[1.25dvw] rounded-[0.25dvw] text-black font-[var(--font-neue-roman)] bg-white"
                  ></textarea>
                </div>
                <div className="w-full h-[20%] flex items-center justify-end">
                  <input
                    className={`submit-btn ${isSubmitted ? "disable" : "enabled"}`}
                    type="submit"
                    value="Send"
                    disabled={isDisabled}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="contact__wrapper__links w-[30%] h-full">
            <div className="h-[15%] w-full">
              <h1 className="text-[2dvw] font-[var(--font-neue-bold)]">Links</h1>
            </div>
            <div className="contact__wrapper__links__buttons w-full h-[85%] flex flex-col items-center justify-center gap-[3vh] p-[1dvw]">
              <Link href="mailto:ayushrameja@gmail.com">Mail</Link>
              <Link href="https://www.linkedin.com/in/ayushrameja/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Link>
              <Link href="https://github.com/RamejaAyush" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
