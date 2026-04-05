import Image from "next/image";

import type { ExperienceTheme } from "@/lib/experienceThemes";

type ExperienceLogoProps = {
  theme: ExperienceTheme;
  className?: string;
  priority?: boolean;
  variant?: "hero" | "card";
};

export default function ExperienceLogo({
  theme,
  className = "",
  priority = false,
  variant = "hero",
}: ExperienceLogoProps) {
  const isSiemensWordmark = theme.slug === "siemens";
  const isCardVariant = variant === "card";

  const logoSizing = isSiemensWordmark
    ? isCardVariant
      ? {
          wrapperClassName:
            "min-h-[2.5rem] max-w-[min(100%,240px)] sm:min-h-[2.75rem]",
          width: 320,
          height: 68,
          imageClassName:
            "h-8 w-auto max-h-8 object-contain object-left sm:h-9 sm:max-h-9 dark:brightness-0 dark:invert",
        }
      : {
          wrapperClassName:
            "min-h-[3rem] max-w-[min(100%,340px)] sm:min-h-[3.5rem]",
          width: 360,
          height: 76,
          imageClassName:
            "h-11 w-auto max-h-11 object-contain object-left sm:h-12 sm:max-h-12 dark:brightness-0 dark:invert",
        }
    : {
        wrapperClassName: "h-11 max-w-[220px]",
        width: 220,
        height: 56,
        imageClassName:
          "h-10 w-auto max-h-10 object-contain object-left dark:brightness-0 dark:invert",
      };

  return (
    <div className={`relative w-full ${logoSizing.wrapperClassName} ${className}`}>
      <Image
        src={theme.logoSrc}
        alt={theme.logoAlt}
        width={logoSizing.width}
        height={logoSizing.height}
        priority={priority}
        className={logoSizing.imageClassName}
      />
    </div>
  );
}
