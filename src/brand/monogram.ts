import { heroTiles } from "./hero-tiles";

// Keep the original letters independent for the a → r loading sequence.
export const monogram = {
  a: { paths: heroTiles.slice(0, 4), viewBox: "0.5 0 50 50" },
  r: { paths: heroTiles.slice(4), viewBox: "54.5 0 50 50" },
} as const;
