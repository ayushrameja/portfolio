// Two quick turns: each letter rests long enough to register, then the edge
// crosses in roughly half a second. Travel includes off-panel lead-in/out for
// the softer refraction trail. The first letter fades in over `logoIn`.
export const INTRO_TIMING = {
  logoIn: 480,
  foldStart: 800,
  foldTravel: 850,
  revealStart: 2150,
  duration: 3100,
} as const;
