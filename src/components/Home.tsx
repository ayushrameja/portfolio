import "../styles/home.scss";
import { Link } from "react-router-dom";
import { IProject } from "../models/IProject";
import { projects } from "../utils/projectData";
import profilePic from "../assets/image/profile.png";
import backgroundVideo from "../assets/video/bg-video.mp4";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
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
    <div className="home">
      <ToastContainer theme="dark" progressStyle={{ background: "#d700c9" }} />
      <div id="about" className="home__landing">
        <motion.div
          className="home__landing__wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="home__landing__wrapper__content">
            <motion.div
              variants={itemVariants}
              className="home__landing__wrapper__content__introduction"
            >
              <div className="home__landing__wrapper__content__introduction__title">
                <div className="home__landing__wrapper__content__introduction__title__profile-picture">
                  <img src={profilePic} alt="Ayush Rameja" />
                </div>
                <div className="home__landing__wrapper__content__introduction__title__header">
                  <div className="home__landing__wrapper__content__introduction__title__header__designation">
                    <p>I'm Ayush Rameja,</p>
                    <p>
                      Software Engineer at <span className="bold">Siemens</span>
                    </p>
                  </div>
                  <div className="home__landing__wrapper__content__introduction__title__header__description">
                    <p>
                      Blending design and function to craft engaging experiences
                      that simplify complexity and surpass expectations.
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                variants={itemVariants}
                className="home__landing__wrapper__content__introduction__cta"
              >
                <div className="home__landing__wrapper__content__introduction__cta__projects">
                  <Link to={"/resume"}>
                    <div className="home__landing__wrapper__content__introduction__cta__projects__text">
                      <p>Resume</p>
                    </div>
                    <div className="home__landing__wrapper__content__introduction__cta__projects__preview">
                      <div className="home__landing__wrapper__content__introduction__cta__projects__preview__wrapper">
                        <div className="home__landing__wrapper__content__introduction__cta__projects__preview__wrapper__outer-layer">
                          <div className="home__landing__wrapper__content__introduction__cta__projects__preview__wrapper__outer-layer__text">
                            <p>Google AIRP Cx</p>
                          </div>
                          <div className="home__landing__wrapper__content__introduction__cta__projects__preview__wrapper__outer-layer__bottom"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="home__landing__wrapper__content__introduction__cta__blogs">
                  <Link to={"/blogs"}>
                    <div className="home__landing__wrapper__content__introduction__cta__blogs__text">
                      <p>Blogs</p>
                    </div>
                    <div className="home__landing__wrapper__content__introduction__cta__blogs__preview">
                      <div className="home__landing__wrapper__content__introduction__cta__blogs__preview__wrapper">
                        <div className="home__landing__wrapper__content__introduction__cta__blogs__preview__wrapper__outer-layer">
                          <div className="home__landing__wrapper__content__introduction__cta__blogs__preview__wrapper__outer-layer__text">
                            <p>
                              <span className="trade">AXU</span>
                              <span className="badge">Blogs</span>
                            </p>
                          </div>
                          <div className="home__landing__wrapper__content__introduction__cta__blogs__preview__wrapper__outer-layer__bottom"></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="home__landing__wrapper__content__experience"
            >
              <div className="home__landing__wrapper__content__experience__content">
                <p>
                  I'm a CS Engineer turned software developer with a{" "}
                  <span className="bold">
                    flair for design, creating seamless digital experiences.
                  </span>
                </p>
                <p>
                  With 4+ years in turning ideas into slick websites, blending
                  code with creativity.
                </p>
                <p>
                  Worked with giants like Google, CHUBB, Siemens, and
                  Coinnection, making designs that stand out.
                </p>
              </div>
              <div className="home__landing__wrapper__content__experience__previous">
                <p className="small">PREVIOUSLY</p>
                <p>
                  Worked as a full stack developer at Accenture AI (prev.
                  Bridgei2i)
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="home__landing__wrapper__video"
          >
            <video autoPlay={true} muted loop>
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>
      <div id="projects" className="home__projects">
        <div className="home__projects__header">
          <p>
            Behind the Code: <span className="gradient">My Story</span>
          </p>
        </div>
        <div className="home__projects__container">
          {projects.map((project: IProject) => (
            <div
              className={`home__projects__container__project ${project.id}`}
              key={project.id}
            >
              <div className="home__projects__container__project__client">
                <div className="home__projects__container__project__client__wrapper">
                  <h1>{project.client}</h1>
                </div>
              </div>
              <div className="home__projects__container__project__content">
                <div className="home__projects__container__project__content__name">
                  <h1>{project.name}</h1>
                </div>
                <div className="home__projects__container__project__content__role">
                  <p>{project.role}</p>
                </div>
                <div className="home__projects__container__project__content__skills">
                  <p>{project.skills.join(", ")}</p>
                </div>
                <div className="home__projects__container__project__content__points">
                  <ul>
                    {project.points.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div className="home__projects__container__project__content__cta">
                  {project.link && <Link to={`${project.link}`}>See More</Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="contact" className="home__contact">
        <div className="home__contact__wrapper">
          <div className="home__contact__wrapper__form">
            <div className="home__contact__wrapper__form__header">
              <h1>
                Ping Me, <span className="gradient">Let's Make Magic</span>
              </h1>
            </div>
            <div className="home__contact__wrapper__form__inputs">
              <form onSubmit={handleSubmit}>
                <div className="name">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Please enter your name… if you dare."
                  />
                </div>
                <div className="message">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Say something smart or funny, no pressure."
                  ></textarea>
                </div>
                <div className="submit">
                  <input
                    className={isSubmitted ? "disable" : "enabled"}
                    type="submit"
                    value="Send"
                    disabled={isDisabled}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="home__contact__wrapper__links">
            <div className="home__contact__wrapper__links__header">
              <h1>Links</h1>
            </div>
            <div className="home__contact__wrapper__links__buttons">
              <Link to={"mailto:ayushrameja@gmail.com"}>Mail</Link>
              <Link to={"https://www.linkedin.com/in/ayushrameja/"}>
                LinkedIn
              </Link>
              <Link to={"https://github.com/RamejaAyush"}>GitHub</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
