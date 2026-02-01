import "../styles/blogs.scss";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Blog = () => {
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
      className="blogs"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="blogs__content">
        <motion.div className="blogs__content__empty-state">
          <motion.h1 variants={itemVariants}>No blogs found!</motion.h1>
          <motion.p variants={itemVariants}>Working on them.</motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Blog;
