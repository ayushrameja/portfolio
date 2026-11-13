/**
 * Homepage "Selected work" bento.
 *
 * Each card is a single link to the project's page. Grid placement and the
 * artwork are chosen by `id` in SelectedWork.astro (comnext and templio are
 * wide, studio is tall, the rest are standard).
 */
export type BrandId = "autodesk" | "siemens" | "google" | "lowhp" | "templio";

export interface MosaicProject {
  id: "comnext" | "learn" | "studio" | "templio" | "siemens" | "google";
  title: string;
  org: string;
  attribution?: string;
  kind: "Professional" | "Personal";
  brand: BrandId;
  summary: string;
  visualNote?: string;
  href: string;
  /** Accent for the card's arrow tile and corner glow. */
  tone: "violet" | "lime" | "coral" | "sky";
}

/** Monochrome brand marks rendered with `fill: currentColor`. */
export const brandMarks: Record<BrandId, { viewBox: string; paths: string[] } | { mask: string }> = {
  // Simple Icons (CC0) — trademarks belong to their owners.
  autodesk: { viewBox: "0 0 24 24", paths: ["m.129 20.202 14.7-9.136h7.625c.235 0 .445.188.445.445 0 .21-.092.305-.21.375l-7.222 4.323c-.47.283-.633.845-.633 1.265l-.008 2.725H24V4.362a.561.561 0 0 0-.585-.562h-8.752L0 12.893V20.2h.129z"] },
  siemens: { viewBox: "0 9.85 24 4.3", paths: ["M1.478 10.016c.24 0 .59.046 1.046.14v.726a2.465 2.465 0 0 0-.946-.213c-.41 0-.615.118-.615.354 0 .088.041.16.124.216.069.045.258.14.568.286.446.208.743.388.89.541.176.182.264.417.264.705 0 .415-.172.73-.516.949-.279.176-.64.264-1.085.264-.375 0-.753-.046-1.133-.139v-.755c.41.135.774.203 1.09.203.437 0 .655-.121.655-.362a.302.302 0 0 0-.095-.227c-.065-.065-.232-.155-.5-.27-.481-.208-.795-.384-.94-.53a.999.999 0 0 1-.284-.73c0-.377.137-.666.413-.864.272-.196.626-.294 1.064-.294zm21.19 0c.246 0 .565.04.956.123l.09.016v.727a2.471 2.471 0 0 0-.948-.213c-.409 0-.612.118-.612.354 0 .088.04.16.123.216.066.043.256.139.57.286.443.208.74.388.889.541.176.182.264.417.264.705 0 .415-.172.73-.514.949-.28.176-.643.264-1.087.264-.376 0-.754-.046-1.134-.139v-.755c.407.135.77.203 1.09.203.437 0 .655-.121.655-.362 0-.09-.03-.166-.092-.227-.066-.065-.233-.155-.503-.27-.48-.206-.793-.382-.94-.53a.997.997 0 0 1-.284-.732c0-.376.137-.664.413-.862.272-.196.627-.294 1.064-.294zm-12.674.066l.92 2.444.942-2.444h1.257v3.825h-.968v-2.708l-1.072 2.747h-.632l-1.052-2.747v2.708H8.67v-3.825zm-5.587 0v3.825H3.386v-3.825zm3.554 0v.692H6.327v.864H7.75v.63H6.327v.908h1.677v.73h-2.66v-3.824zm8.707 0v.692h-1.634v.864h1.422v.63h-1.422v.908h1.677v.73H14.05v-3.824zm1.898 0l1.255 2.56v-2.56h.719v3.825h-1.15l-1.288-2.595v2.595h-.72v-3.825z"] },
  google: { viewBox: "0 0 24 24", paths: ["M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"] },
  // Templio mark from templio.app/favicon.svg.
  templio: { viewBox: "-8 -14 233 226", paths: ["M0 46L33 0H217L188.5 46H0Z", "M121 53H171V144L121 198V53Z"] },
  // Low HP mark is a multi-shape SVG; it is used as an alpha mask so it can be tinted.
  lowhp: { mask: "/projects/lowhp.svg" },
};

export const mosaicProjects: MosaicProject[] = [
  {
    id: "comnext",
    title: ".comNext",
    org: "Autodesk",
    kind: "Professional",
    brand: "autodesk",
    summary: "From static pages to a content-driven web platform.",
    visualNote: "Public-site reference",
    href: "/projects/comnext/",
    tone: "violet",
  },
  {
    id: "learn",
    title: "Learn v2",
    org: "Autodesk",
    kind: "Professional",
    brand: "autodesk",
    summary: "Courses, roadmaps and live support sessions.",
    visualNote: "Workflow illustration",
    href: "/projects/mvp-learn-v2/",
    tone: "lime",
  },
  {
    id: "studio",
    title: "Low HP Studio",
    org: "lowhp.studio",
    kind: "Personal",
    brand: "lowhp",
    summary: "My indie studio for games, websites and experiments.",
    href: "/projects/low-hp-studio/",
    tone: "coral",
  },
  {
    id: "siemens",
    title: "IGBT Health",
    org: "Siemens",
    kind: "Professional",
    brand: "siemens",
    summary: "Real-time industrial monitoring.",
    visualNote: "Signal illustration",
    href: "/projects/igbt-health-app/",
    tone: "sky",
  },
  {
    id: "google",
    title: "Customer Experience",
    org: "Google",
    attribution: "via Accenture",
    kind: "Professional",
    brand: "google",
    summary: "APIs, custom roles and cloud storage.",
    visualNote: "Concept illustration",
    href: "/projects/google-customer-experience/",
    tone: "coral",
  },
  {
    id: "templio",
    title: "Templio",
    org: "templio.app",
    kind: "Personal",
    brand: "templio",
    summary: "Custom websites that feel hand-built.",
    href: "/projects/templio/",
    tone: "violet",
  },
];
