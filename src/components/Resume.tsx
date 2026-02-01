import "../styles/resume.scss";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Resume = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const iframeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    document.title = "Resume: Ayush Rameja";
  }, []);

  return (
    <motion.div
      className="resume"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.iframe
        src="https://drive.google.com/file/d/1KH4dnH50ocYFxv0Cut7gqMltRDHgC088/preview"
        title="Ayush Rameja's Resume"
        className="resume__iframe"
        variants={iframeVariants}
      ></motion.iframe>
      <div className="action-button">
        <a
          href="https://drive.google.com/uc?export=download&id=1KH4dnH50ocYFxv0Cut7gqMltRDHgC088"
          download
          className="download-button"
        >
          Download Resume
        </a>
      </div>
    </motion.div>
  );
};

export default Resume;
