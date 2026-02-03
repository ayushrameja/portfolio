"use client";

import { create } from "zustand";

interface AppState {
  navClass: string;
  currentRoute: string;
  showExternal: boolean;
  setNavClass: (navClass: string) => void;
  setShowExternal: (show: boolean) => void;
  setCurrentRoute: (route: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  navClass: "grey",
  showExternal: false,
  currentRoute: "Home",
  setNavClass: (navClass: string) => set({ navClass }),
  setShowExternal: (show: boolean) => set({ showExternal: show }),
  setCurrentRoute: (route: string) => set({ currentRoute: route }),
}));
