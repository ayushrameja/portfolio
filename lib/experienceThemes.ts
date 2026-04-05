import type { EmployerSlug } from "@/types/project";

export type ExperienceTheme = {
  slug: EmployerSlug;
  logoSrc: string;
  logoAlt: string;
  card: {
    shell: string;
    glowLeft: string;
    glowRight: string;
    focusRing: string;
    roleChip: string;
    viaChip: string;
    footerBorder: string;
    cta: string;
  };
  page: {
    shell: string;
    hero: string;
    gridPattern: string;
    ambientA: string;
    ambientB: string;
    ambientC: string;
    heroTitle: string;
    heroEyebrow: string;
    backLink: string;
    roleText: string;
    metaText: string;
    bullet: string;
    externalLink: string;
    sectionTitle: string;
    sectionSubtitle: string;
    projectsBand: string;
  };
  projectCard: {
    shell: string;
    bullet: string;
    glowA: string;
    glowB: string;
    roleChip: string;
  };
};

export const EXPERIENCE_THEMES: Record<EmployerSlug, ExperienceTheme> = {
  autodesk: {
    slug: "autodesk",
    logoSrc: "/assets/experience/autodesk.svg",
    logoAlt: "Autodesk",
    card: {
      shell:
        "border border-cyan-200/60 bg-white/70 hover:border-cyan-300/80 dark:border-cyan-800/40 dark:bg-zinc-900/40 dark:hover:border-cyan-600/50",
      glowLeft:
        "bg-cyan-400/15 blur-3xl dark:bg-cyan-400/12",
      glowRight:
        "bg-sky-400/12 blur-3xl dark:bg-sky-400/10",
      focusRing: "focus-visible:ring-cyan-500/40",
      roleChip:
        "border border-cyan-500/30 bg-cyan-500/10 text-cyan-900 dark:border-cyan-400/35 dark:bg-cyan-400/10 dark:text-cyan-100",
      viaChip:
        "border border-cyan-200/70 bg-cyan-50/50 text-cyan-800 dark:border-cyan-800/50 dark:bg-cyan-950/30 dark:text-cyan-300/90",
      footerBorder: "border-t border-cyan-200/60 dark:border-cyan-800/40",
      cta: "text-cyan-950 dark:text-cyan-50",
    },
    page: {
      shell:
        "bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(6,182,212,0.14),transparent_50%)] dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(6,182,212,0.12),transparent_55%)]",
      hero:
        "border-b border-cyan-200/50 bg-linear-to-b from-sky-100/70 via-white to-cyan-50/40 dark:border-cyan-900/40 dark:from-sky-950/45 dark:via-zinc-950 dark:to-cyan-950/25",
      gridPattern:
        "opacity-[0.4] dark:opacity-[0.22] [background-image:linear-gradient(to_right,rgba(6,182,212,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.07)_1px,transparent_1px)] [background-size:72px_72px]",
      ambientA:
        "bg-cyan-400/25 blur-3xl dark:bg-cyan-500/15",
      ambientB:
        "bg-sky-400/20 blur-3xl dark:bg-sky-500/12",
      ambientC:
        "bg-teal-400/15 blur-3xl dark:bg-teal-500/10",
      heroTitle:
        "bg-linear-to-r from-cyan-700 via-sky-700 to-teal-700 bg-clip-text text-transparent dark:from-cyan-200 dark:via-sky-200 dark:to-teal-200",
      heroEyebrow: "text-cyan-600 dark:text-cyan-400/90",
      backLink:
        "text-cyan-800 hover:text-cyan-950 dark:text-cyan-300/90 dark:hover:text-cyan-100",
      roleText: "text-cyan-950 dark:text-cyan-50",
      metaText: "text-cyan-800/90 dark:text-cyan-200/80",
      bullet: "bg-cyan-500 dark:bg-cyan-400",
      externalLink:
        "border border-cyan-200/80 bg-white/90 text-cyan-950 hover:bg-white dark:border-cyan-800/60 dark:bg-cyan-950/40 dark:text-cyan-50 dark:hover:bg-cyan-950/60",
      sectionTitle: "text-cyan-950 dark:text-cyan-50",
      sectionSubtitle: "text-cyan-800/80 dark:text-cyan-200/75",
      projectsBand:
        "bg-linear-to-b from-transparent via-cyan-50/20 to-transparent dark:via-cyan-950/15",
    },
    projectCard: {
      shell:
        "border border-cyan-200/65 bg-white/65 shadow-[0_22px_70px_-55px_rgba(6,182,212,0.18)] backdrop-blur transition-all duration-300 hover:border-cyan-300/85 hover:shadow-[0_30px_90px_-60px_rgba(6,182,212,0.22)] dark:border-cyan-800/45 dark:bg-zinc-900/35 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)] dark:hover:border-cyan-600/55 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.88)]",
      bullet: "bg-cyan-500 dark:bg-cyan-400",
      glowA: "bg-cyan-400/14 blur-3xl dark:bg-cyan-400/10",
      glowB: "bg-sky-400/12 blur-3xl dark:bg-sky-400/8",
      roleChip:
        "border border-cyan-500/25 bg-cyan-500/10 text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-200",
    },
  },
  siemens: {
    slug: "siemens",
    logoSrc: "/assets/experience/siemens.svg",
    logoAlt: "Siemens",
    card: {
      shell:
        "border border-emerald-200/60 bg-white/70 hover:border-emerald-300/80 dark:border-emerald-800/45 dark:bg-zinc-900/40 dark:hover:border-emerald-600/55",
      glowLeft:
        "bg-emerald-400/14 blur-3xl dark:bg-emerald-400/11",
      glowRight:
        "bg-teal-400/12 blur-3xl dark:bg-teal-400/9",
      focusRing: "focus-visible:ring-emerald-500/40",
      roleChip:
        "border border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:border-emerald-400/35 dark:bg-emerald-400/10 dark:text-emerald-100",
      viaChip:
        "border border-emerald-200/70 bg-emerald-50/50 text-emerald-800 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-300/90",
      footerBorder: "border-t border-emerald-200/60 dark:border-emerald-800/45",
      cta: "text-emerald-950 dark:text-emerald-50",
    },
    page: {
      shell:
        "bg-[radial-gradient(ellipse_120%_80%_at_80%_0%,rgba(16,185,129,0.12),transparent_50%)] dark:bg-[radial-gradient(ellipse_100%_55%_at_70%_-5%,rgba(16,185,129,0.1),transparent_50%)]",
      hero:
        "border-b border-emerald-200/50 bg-linear-to-br from-emerald-100/60 via-white to-teal-50/35 dark:border-emerald-900/40 dark:from-emerald-950/40 dark:via-zinc-950 dark:to-teal-950/25",
      gridPattern:
        "opacity-[0.38] dark:opacity-[0.2] [background-image:linear-gradient(to_right,rgba(16,185,129,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.07)_1px,transparent_1px)] [background-size:72px_72px]",
      ambientA:
        "bg-emerald-400/22 blur-3xl dark:bg-emerald-500/14",
      ambientB:
        "bg-teal-400/18 blur-3xl dark:bg-teal-500/11",
      ambientC:
        "bg-green-400/12 blur-3xl dark:bg-green-500/8",
      heroTitle:
        "bg-linear-to-r from-emerald-700 via-teal-700 to-green-800 bg-clip-text text-transparent dark:from-emerald-200 dark:via-teal-200 dark:to-green-200",
      heroEyebrow: "text-emerald-600 dark:text-emerald-400/90",
      backLink:
        "text-emerald-800 hover:text-emerald-950 dark:text-emerald-300/90 dark:hover:text-emerald-100",
      roleText: "text-emerald-950 dark:text-emerald-50",
      metaText: "text-emerald-800/90 dark:text-emerald-200/80",
      bullet: "bg-emerald-500 dark:bg-emerald-400",
      externalLink:
        "border border-emerald-200/80 bg-white/90 text-emerald-950 hover:bg-white dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-50 dark:hover:bg-emerald-950/60",
      sectionTitle: "text-emerald-950 dark:text-emerald-50",
      sectionSubtitle: "text-emerald-800/80 dark:text-emerald-200/75",
      projectsBand:
        "bg-linear-to-b from-transparent via-emerald-50/25 to-transparent dark:via-emerald-950/15",
    },
    projectCard: {
      shell:
        "border border-emerald-200/65 bg-white/65 shadow-[0_22px_70px_-55px_rgba(16,185,129,0.16)] backdrop-blur transition-all duration-300 hover:border-emerald-300/85 hover:shadow-[0_30px_90px_-60px_rgba(16,185,129,0.2)] dark:border-emerald-800/45 dark:bg-zinc-900/35 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)] dark:hover:border-emerald-600/55 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.88)]",
      bullet: "bg-emerald-500 dark:bg-emerald-400",
      glowA: "bg-emerald-400/12 blur-3xl dark:bg-emerald-400/9",
      glowB: "bg-teal-400/10 blur-3xl dark:bg-teal-400/7",
      roleChip:
        "border border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200",
    },
  },
  accenture: {
    slug: "accenture",
    logoSrc: "/assets/experience/accenture.svg",
    logoAlt: "Accenture",
    card: {
      shell:
        "border border-violet-200/60 bg-white/70 hover:border-violet-300/80 dark:border-violet-800/45 dark:bg-zinc-900/40 dark:hover:border-violet-600/55",
      glowLeft:
        "bg-violet-400/16 blur-3xl dark:bg-violet-400/12",
      glowRight:
        "bg-fuchsia-400/12 blur-3xl dark:bg-fuchsia-400/9",
      focusRing: "focus-visible:ring-violet-500/45",
      roleChip:
        "border border-violet-500/30 bg-violet-500/10 text-violet-900 dark:border-violet-400/35 dark:bg-violet-400/10 dark:text-violet-100",
      viaChip:
        "border border-violet-200/70 bg-violet-50/50 text-violet-800 dark:border-violet-800/50 dark:bg-violet-950/30 dark:text-violet-300/90",
      footerBorder: "border-t border-violet-200/60 dark:border-violet-800/45",
      cta: "text-violet-950 dark:text-violet-50",
    },
    page: {
      shell:
        "bg-[radial-gradient(ellipse_100%_70%_at_20%_0%,rgba(139,92,246,0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_50%_at_15%_-5%,rgba(139,92,246,0.12),transparent_55%)]",
      hero:
        "border-b border-violet-200/50 bg-linear-to-tr from-violet-100/55 via-fuchsia-50/40 to-purple-50/50 dark:border-violet-900/40 dark:from-violet-950/45 dark:via-zinc-950 dark:to-fuchsia-950/22",
      gridPattern:
        "opacity-[0.42] dark:opacity-[0.22] [background-image:linear-gradient(to_right,rgba(139,92,246,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.07)_1px,transparent_1px)] [background-size:72px_72px]",
      ambientA:
        "bg-violet-400/22 blur-3xl dark:bg-violet-500/14",
      ambientB:
        "bg-fuchsia-400/18 blur-3xl dark:bg-fuchsia-500/11",
      ambientC:
        "bg-purple-400/14 blur-3xl dark:bg-purple-500/9",
      heroTitle:
        "bg-linear-to-r from-violet-700 via-fuchsia-600 to-purple-700 bg-clip-text text-transparent dark:from-violet-200 dark:via-fuchsia-200 dark:to-purple-200",
      heroEyebrow: "text-violet-600 dark:text-violet-400/90",
      backLink:
        "text-violet-800 hover:text-violet-950 dark:text-violet-300/90 dark:hover:text-violet-100",
      roleText: "text-violet-950 dark:text-violet-50",
      metaText: "text-violet-800/90 dark:text-violet-200/80",
      bullet: "bg-violet-500 dark:bg-violet-400",
      externalLink:
        "border border-violet-200/80 bg-white/90 text-violet-950 hover:bg-white dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-50 dark:hover:bg-violet-950/60",
      sectionTitle: "text-violet-950 dark:text-violet-50",
      sectionSubtitle: "text-violet-800/80 dark:text-violet-200/75",
      projectsBand:
        "bg-linear-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/18",
    },
    projectCard: {
      shell:
        "border border-violet-200/65 bg-white/65 shadow-[0_22px_70px_-55px_rgba(139,92,246,0.18)] backdrop-blur transition-all duration-300 hover:border-violet-300/85 hover:shadow-[0_30px_90px_-60px_rgba(139,92,246,0.22)] dark:border-violet-800/45 dark:bg-zinc-900/35 dark:shadow-[0_22px_70px_-55px_rgba(0,0,0,0.75)] dark:hover:border-violet-600/55 dark:hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.88)]",
      bullet: "bg-violet-500 dark:bg-violet-400",
      glowA: "bg-violet-400/14 blur-3xl dark:bg-violet-400/10",
      glowB: "bg-fuchsia-400/11 blur-3xl dark:bg-fuchsia-400/8",
      roleChip:
        "border border-violet-500/25 bg-violet-500/10 text-violet-800 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
    },
  },
};

export function getExperienceTheme(slug: EmployerSlug): ExperienceTheme {
  return EXPERIENCE_THEMES[slug];
}
