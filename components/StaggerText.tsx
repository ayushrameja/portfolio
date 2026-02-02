"use client";

import { motion } from "framer-motion";

const StaggeredText = ({ text }: { text: string }) => {
  const letterVariants = {
    rest: { y: "0%" },
    hover: (i: number) => ({
      y: "-100%",
      transition: { duration: 0.22, ease: "easeOut", delay: i * 0.02 },
    }),
  };

  return (
    <motion.span initial="rest" animate="rest" whileHover="hover" className="inline-flex">
      {[...text].map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="relative inline-block h-[1em] overflow-hidden leading-none"
          aria-hidden={char === " "}
        >
          <motion.span
            custom={index}
            variants={letterVariants}
            className="block will-change-transform"
          >
            <span className="block">{char === " " ? "\u00A0" : char}</span>
            <span className="block">{char === " " ? "\u00A0" : char}</span>
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default StaggeredText;
