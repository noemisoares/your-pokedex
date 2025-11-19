import { create } from "zustand";

export type Dev = {
  id: string;
  name: string;
  username: string;
  favoritePokemon: string;
  gymType: string;
  title: string;
  mainTeam: string[];
};

type DevStore = {
  devs: Dev[];
};

export const useDevs = create<DevStore>(() => ({
  devs: [
    {
      id: "noemi",
      name: "Noemi Soares",
      username: "@noemi",
      favoritePokemon: "Blastoise",
      gymType: "Água",
      title: "Líder de Ginásio Aquático",
      mainTeam: ["blastoise", "gyarados", "lapras", "kingdra", "starmie", "vaporeon"],
    },
    {
      id: "willian",
      name: "Willian Rodrigues",
      username: "@will",
      favoritePokemon: "Arcanine",
      gymType: "Fogo",
      title: "Líder de Ginásio Flamejante",
      mainTeam: ["arcanine", "ninetales", "charizard", "rapidash", "flareon", "magmar"],
    },
    {
      id: "ricardo",
      name: "Ricardo Nery",
      username: "@ricardo",
      favoritePokemon: "Magikarp",
      gymType: "Normal",
      title: "Treinador além da aparência",
      mainTeam: ["magikarp", "gyarados", "blastoise", "pelipper", "seaking", "whiscash"],
    },
    {
      id: "pedro",
      name: "Pedro Mota",
      username: "@pedro",
      favoritePokemon: "Charizard",
      gymType: "Fogo e Voo",
      title: "Mestre dos Céus Flamejantes",
      mainTeam: ["charizard", "salamence", "arcanine", "gengar", "aerodactyl", "typhlosion"],
    },
    {
      id: "artur",
      name: "Artur Uchôa",
      username: "@artur",
      favoritePokemon: "Gengar",
      gymType: "Fantasma",
      title: "Sombra dos Sonhos Perdidos",
      mainTeam: ["gengar", "mismagius", "dusclops", "chandelure", "banette", "giratina"],
    },
  ],
}));
