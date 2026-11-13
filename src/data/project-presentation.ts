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

// The project records carry these two names in capitals; show them as the rest of the site does.
// CHUBB stays as written, matching its project title.
const clientNames: Record<string, string> = { AUTODESK: "Autodesk", SIEMENS: "Siemens" };

export function projectClient(client?: string, employer?: string) {
  const name = client && (clientNames[client] ?? client);
  return name && employer === "accenture" ? `${name} via Accenture` : name;
}

export const projectGroups = [
  { id: "employer", label: "Employer work", description: "Engineering for Autodesk, Siemens and clients through Accenture." },
  { id: "independent", label: "Independent", description: "Games, websites and tools built from curiosity." },
] as const;

// Tone and corner are paired as in the hero's mosaic.
const tileLooks = [["violet", "tl"], ["lime", "bl"], ["coral", "br"], ["sky", "tr"]] as const;

/** A project's numbered tile: its place in the full list, with a tone and
 *  corner that stay the same wherever the project appears. */
export function projectTile(index: number) {
  const [tone, corner] = tileLooks[index % tileLooks.length];
  return { number: String(index + 1).padStart(2, "0"), tone, shape: `shape-${corner} tone-${tone}` };
}
