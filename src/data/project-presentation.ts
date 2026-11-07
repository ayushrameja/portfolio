type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

/** Existing public assets only. Captions distinguish context from delivery evidence. */
export const projectImages: Record<string, ProjectImage[]> = {
  comnext: [{
    src: "/projects/autodesk-home.jpg",
    alt: "Autodesk homepage with its featured story and industry navigation",
    caption: "Autodesk.com, captured October 2026. Public-site context, not a before-and-after record of the migration.",
    width: 1280, height: 800,
  }],
  templio: [{
    src: "/projects/templio.webp",
    alt: "Templio website presenting its custom website design service",
    caption: "Templio's public website, from the portfolio's existing project captures.",
    width: 1600, height: 1000,
  }],
  burnhop: [{
    src: "/projects/burnhop.webp",
    alt: "Burnhop desert game title screen",
    caption: "Burnhop's browser build. The public release supports solo practice.",
    width: 1600, height: 1000,
  }],
  greytrace: [{
    src: "/projects/greytrace.webp",
    alt: "Greytrace operator and game lobby",
    caption: "Greytrace's browser prototype. Practice maps, without live matchmaking.",
    width: 1280, height: 800,
  }],
};
projectImages["low-hp-studio"] = [projectImages.burnhop[0], projectImages.greytrace[0]];

export function projectClient(client?: string, employer?: string) {
  return client && employer === "accenture" ? `${client} via Accenture` : client;
}
