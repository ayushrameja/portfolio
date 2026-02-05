"use client";

import { motion } from "framer-motion";

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M20 80 L50 20 L80 80"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.path
        d="M35 50 L65 50"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
};

export const LogoText = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`font-editorial font-bold tracking-tighter ${className}`}>
      AYUSH
    </div>
  );
};
