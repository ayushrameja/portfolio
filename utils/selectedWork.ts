// Public-project scope checked against repositories and live sites on 2026-10-11.
// Private projects and unverified usage/performance metrics are deliberately omitted.
export type SelectedProject = {
  slug: string;
  name: string;
  type: string;
  status: string;
  role: string;
  summary: string;
  image: string;
  alt: string;
  tone: string;
  href: string;
  source?: string;
  stack: string[];
  story: string;
  scope: string;
};
export const selectedWork: SelectedProject[] = [
  {
    slug: "bakbak",
    name: "Bakbak",
    type: "Desktop product",
    status: "Private beta",
    role: "Creator · full-stack engineering",
    summary:
      "A private room for friends, with persistent chat and drop-in calls.",
    image: "/assets/work/bakbak.webp",
    alt: "Bakbak 2 local demo interface with fictional members, private channels, and an empty chat",
    tone: "lilac",
    href: "/bakbak",
    source: "https://github.com/ayushrameja/bakbak",
    stack: ["React", "Tauri", "Supabase"],
    story:
      "Bakbak started with a small social problem: keeping a shared room around for close friends without building another public feed. The work spans the desktop interface, persistent conversations, real-time calls, and packaging the app for release.",
    scope:
      "Published desktop beta. Joining a room requires an invitation. The image shows the current local demo with fictional members and an empty conversation; the release page has the published build.",
  },
  {
    slug: "masala",
    name: "Masala",
    type: "Client website",
    status: "Live",
    role: "Website design & development",
    summary:
      "A warm restaurant website built around the menu, the food, and finding a table.",
    image: "/assets/work/masala.webp",
    alt: "Masala Indian Restaurant website showing its food-led homepage",
    tone: "peach",
    href: "https://masala-indian-restaurant.vercel.app/en",
    stack: ["Next.js", "React", "TypeScript"],
    story:
      "For Masala Indian Restaurant, the website needs to get the essentials right: browse the food, find the restaurant, and make a reservation. The visual direction brings the warmth of the restaurant into a clear, responsive interface.",
    scope:
      "Live client website with menu browsing and reservation contact links. Recent menu-language work is separate from the version pictured here.",
  },
  {
    slug: "burnhop",
    name: "Burnhop",
    type: "Browser prototype",
    status: "Solo practice",
    role: "Creator · game development",
    summary:
      "A desert playground for movement, momentum, and one more attempt.",
    image: "/assets/work/burnhop.webp",
    alt: "Burnhop game entrance with its pilot and desert outpost",
    tone: "lime",
    href: "https://burnhop.lowhp.studio/",
    source: "https://github.com/ayushrameja/burnhop",
    stack: ["TypeScript", "Canvas 2D", "React"],
    story:
      "Burnhop explores how movement feels in the browser. The work connects a stylized game world with player controls, a readable interface, and the quick restart loop that makes practice inviting.",
    scope:
      "The public browser build is solo practice. Multiplayer hosting is inactive. A separate native rewrite is in development and is not the browser build linked here.",
  },
  {
    slug: "templio",
    name: "Templio",
    type: "Web initiative",
    status: "Live",
    role: "Founder · design & engineering",
    summary:
      "Custom websites for people with an idea worth giving its own corner of the web.",
    image: "/assets/work/templio.webp",
    alt: "Templio website introducing its bespoke website initiative",
    tone: "lilac",
    href: "https://www.templio.app/",
    stack: ["Next.js", "React", "TypeScript"],
    story:
      "Templio is a place to make bespoke websites together. Portfolios, studio pages, community sites: each starts with the person and the idea, then gets a composition of its own.",
    scope:
      "A live custom-website initiative and showcase. It is not currently presented as a self-service AI website builder.",
  },
  {
    slug: "greytrace",
    name: "Greytrace",
    type: "Shooting prototype",
    status: "Practice maps",
    role: "Game development · Low HP Studio",
    summary:
      "A tactical browser prototype exploring atmosphere, operators, and gun handling.",
    image: "/assets/work/greytrace.webp",
    alt: "Greytrace browser prototype title screen with a coastal shooting scene",
    tone: "mist",
    href: "https://greytrace.lowhp.studio/",
    source: "https://github.com/Low-HP-Studios/greytrace",
    stack: ["React", "Three.js", "TypeScript"],
    story:
      "Greytrace pairs a cinematic lobby with a focused shooting-practice loop. The work brings together character presentation, map selection, movement, weapon feedback, and settings in a web build.",
    scope:
      "Web prototype with practice maps. There is no matchmaking, account system, or backend progression. These are boundaries of the current project, not released features.",
  },
];
