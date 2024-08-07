import { create } from "zustand";

interface RocketFavoriteState {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export const useRocketFavoritesStore = create<RocketFavoriteState>((set) => ({
  favorites: new Set(),
  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return { favorites: newFavorites };
    }),
}));
