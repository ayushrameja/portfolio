import { create } from "zustand";

interface AppState {
  navClass: string;
  isLoading: boolean;
  currentRoute: string;
  showExternal: boolean;
  setNavClass: (navClass: string) => void;
  setIsLoading: (loading: boolean) => void;
  setShowExternal: (show: boolean) => void;
  setCurrentRoute: (route: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  navClass: "grey",
  showExternal: false,
  currentRoute: "Home",
  setNavClass: (navClass: string) => set({ navClass }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setShowExternal: (show: boolean) => set({ showExternal: show }),
  setCurrentRoute: (route: string) => set({ currentRoute: route }),
}));
