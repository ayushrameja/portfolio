import Image from "next/image";

import type { EmployerSlug } from "@/types/project";

const LOGOS: Record<EmployerSlug, { src: string; alt: string }> = {
  autodesk: { src: "/assets/experience/autodesk.svg", alt: "Autodesk" },
  siemens: { src: "/assets/experience/siemens.svg", alt: "Siemens" },
  accenture: { src: "/assets/experience/accenture.svg", alt: "Accenture" },
};

type ExperienceLogoProps = {
  slug: EmployerSlug;
  className?: string;
  priority?: boolean;
  variant?: "hero" | "index";
};

export default function ExperienceLogo({
  slug,
  className = "",
  priority = false,
  variant = "hero",
}: ExperienceLogoProps) {
  const logo = LOGOS[slug];
  const isWordmark = slug === "siemens";
  const heightClass = variant === "hero" ? "h-12 sm:h-16" : "h-8 sm:h-10";

  return (
    <div className={`${heightClass} ${isWordmark ? "w-48 sm:w-60" : "w-28 sm:w-36"} ${className}`}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={isWordmark ? 360 : 220}
        height={isWordmark ? 76 : 56}
        priority={priority}
        className="h-full w-full object-contain object-left brightness-0 dark:invert"
      />
    </div>
  );
}
