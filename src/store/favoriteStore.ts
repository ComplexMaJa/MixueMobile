import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: string[]; // array of product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (productId) => set((state) => {
        if (state.favorites.includes(productId)) {
          return { favorites: state.favorites.filter(id => id !== productId) };
        }
        return { favorites: [...state.favorites, productId] };
      }),
      isFavorite: (productId) => get().favorites.includes(productId),
    }),
    {
      name: 'mixue-favorites-storage',
    }
  )
);
