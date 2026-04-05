import Image from "next/image";

import type { ExperienceTheme } from "@/lib/experienceThemes";

type ExperienceLogoProps = {
  theme: ExperienceTheme;
  className?: string;
  priority?: boolean;
};

export default function ExperienceLogo({
  theme,
  className = "",
  priority = false,
}: ExperienceLogoProps) {
  const isSiemensWordmark = theme.slug === "siemens";

  return (
    <div
      className={`relative w-full ${
        isSiemensWordmark
          ? "min-h-[3.25rem] max-w-[min(100%,380px)] sm:min-h-[3.75rem]"
          : "h-11 max-w-[220px]"
      } ${className}`}
    >
      <Image
        src={theme.logoSrc}
        alt={theme.logoAlt}
        width={isSiemensWordmark ? 380 : 220}
        height={isSiemensWordmark ? 80 : 56}
        priority={priority}
        className={
          isSiemensWordmark
            ? "h-12 w-auto max-h-12 object-contain object-left sm:h-14 sm:max-h-[3.5rem] dark:brightness-0 dark:invert"
            : "h-10 w-auto max-h-10 object-contain object-left dark:brightness-0 dark:invert"
        }
      />
    </div>
  );
}
