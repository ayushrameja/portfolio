"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { useMemo } from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

/* ── stable motion component map (module-level, never re-created) ── */
const MOTION_TAGS: Record<Tag, React.ComponentType<HTMLMotionProps<any>>> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
};

/* ── hoisted default variants ── */
const DEFAULT_PARENT_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const DEFAULT_CHILD_VARIANTS: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface TextRevealProps extends Omit<HTMLMotionProps<any>, "children"> {
  children: string;
  as?: Tag;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: tag = "span",
  delay = 0,
  stagger = 0.04,
  duration = 0.5,
  once = true,
  className,
  ...rest
}: TextRevealProps) {
  const MotionTag = MOTION_TAGS[tag];
  const words = children.split(" ");

  const parentVariants = useMemo<Variants>(() => {
    if (stagger === 0.04 && delay === 0) return DEFAULT_PARENT_VARIANTS;
    return {
      hidden: {},
      visible: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };
  }, [stagger, delay]);

  const childVariants = useMemo<Variants>(() => {
    if (duration === 0.5) return DEFAULT_CHILD_VARIANTS;
    return {
      hidden: { y: "100%" },
      visible: {
        y: 0,
        transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
      },
    };
  }, [duration]);

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={parentVariants}
      {...rest}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-clip">
          <motion.span
            className="inline-block"
            variants={childVariants}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}
