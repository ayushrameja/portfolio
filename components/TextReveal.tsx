"use client";

import { motion } from "framer-motion";
import type { HTMLAttributes } from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TextRevealProps extends HTMLAttributes<HTMLElement> {
  children: string;
  as?: Tag;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = "span",
  delay = 0,
  stagger = 0.04,
  duration = 0.5,
  once = true,
  className,
  ...rest
}: TextRevealProps) {
  const MotionTag = motion.create(Tag);
  const words = children.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...rest}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-clip">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: 0,
                transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}
