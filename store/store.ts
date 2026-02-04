"use client";

import { create } from "zustand";

interface AppState {
  currentRoute: string;
  showExternal: boolean;
  setShowExternal: (show: boolean) => void;
  setCurrentRoute: (route: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  showExternal: false,
  currentRoute: "Home",
  setShowExternal: (show: boolean) => set({ showExternal: show }),
  setCurrentRoute: (route: string) => set({ currentRoute: route }),
}));
