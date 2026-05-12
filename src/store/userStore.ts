import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  phone: string;
  pfp: string | null; // Base64 string or URL
  setName: (name: string) => void;
  setPfp: (pfp: string | null) => void;
  setPhone: (phone: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: 'Mixue Lover',
      phone: '+62 812 3456 7890',
      pfp: null,
      setName: (name) => set({ name }),
      setPfp: (pfp) => set({ pfp }),
      setPhone: (phone) => set({ phone }),
    }),
    {
      name: 'mixue-user-storage',
    }
  )
);
