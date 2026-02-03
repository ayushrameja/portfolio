"use client";

import { motion } from "framer-motion";

const StaggeredText = ({ text }: { text: string }) => {
  const containerVariants = {
    rest: {},
    hover: {},
  };

  const letterVariants = {
    rest: { y: 0 },
    hover: (i: number) => ({
      y: "-1.2em",
      transition: { duration: 0.22, ease: "easeOut", delay: i * 0.02 },
    }),
  };

  return (
    <>
      <span className="invisible">{text}</span>
      <motion.span
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={containerVariants}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        {[...text].map((char, index) => (
          <span
            key={`${char}-${index}`}
            className="relative inline-block h-[1.2em] overflow-hidden align-middle"
            aria-hidden={char === " "}
          >
            <motion.span
              custom={index}
              variants={letterVariants}
              className="block"
            >
              <span className="block h-[1.2em] leading-[1.2]">{char === " " ? "\u00A0" : char}</span>
              <span className="block h-[1.2em] leading-[1.2]">{char === " " ? "\u00A0" : char}</span>
            </motion.span>
          </span>
        ))}
      </motion.span>
    </>
  );
};

export default StaggeredText;
