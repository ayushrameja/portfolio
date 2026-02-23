"use client";

import TextReveal from "@/components/TextReveal";

interface FooterRevealProps {
  children: string;
  delay?: number;
  className?: string;
}

export default function FooterReveal({
  children,
  delay = 0,
  className,
}: FooterRevealProps) {
  return (
    <TextReveal as="p" delay={delay} className={className}>
      {children}
    </TextReveal>
  );
}
