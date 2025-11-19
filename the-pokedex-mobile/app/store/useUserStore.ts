import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface Team {
  objectId?: string;
  teamName: string;
  pokemons: Pokemon[];
}

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
  teams: Team[];
  editingTeam?: Team | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  setTeams: (teams: Team[]) => void;
  addTeam: (team: Team) => void;
  removeTeam: (objectId: string) => void;
  setEditingTeam: (team: Team | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      teams: [],
      editingTeam: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      setTeams: (teams) => set({ teams }),
      addTeam: (team) => set({ teams: [...get().teams, team] }),
      removeTeam: (objectId) =>
        set({ teams: get().teams.filter((t) => t.objectId !== objectId) }),
      setEditingTeam: (team) => set({ editingTeam: team }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        teams: state.teams,
        editingTeam: state.editingTeam,
      }),
    }
  )
);
