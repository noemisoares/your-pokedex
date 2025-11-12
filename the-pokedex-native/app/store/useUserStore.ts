import { create } from "zustand";

interface User {
  objectId?: string;
  username?: string;
  email?: string;
  trainerName?: string; 
  sessionToken?: string;
  anonymous?: boolean;

}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
