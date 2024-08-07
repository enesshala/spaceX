// src/store/useRocketStore.ts
import { create } from "zustand";
import { CustomRocket, Measurement, Rocket } from "@/interfaces/rocket";

interface RocketState {
  rockets: Rocket[] | CustomRocket[];
  setRockets: (rockets: Rocket[] | CustomRocket[]) => void;
  addRocket: (rocket: CustomRocket) => void;
}

export const useRocketStore = create<RocketState>((set) => ({
  rockets: [],
  setRockets: (rockets) => set({ rockets }),
  addRocket: (rocket) =>
    set((state) => ({ rockets: [...state.rockets, rocket] })),
}));
