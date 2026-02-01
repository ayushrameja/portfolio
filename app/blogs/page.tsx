"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    document.title = "Blogs: Ayush Rameja";
  }, []);

  return (
    <motion.div
      className="w-full h-full min-h-dvh"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="w-full h-[90dvh] p-[1dvw] rounded-[3dvw] bg-[var(--black)]">
        <motion.div className="blogs__content__empty-state">
          <motion.h1 variants={itemVariants}>No blogs found!</motion.h1>
          <motion.p variants={itemVariants}>Working on them.</motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
