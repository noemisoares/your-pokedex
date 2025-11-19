import { create } from "zustand";

export type PokemonTeamMember = {
  id: number;
  name: string;
};

export type Dev = {
  id: string;
  name: string;
  username: string;
  title: string;
  gymType: string;
  trainerImage: string;
  mainTeam: PokemonTeamMember[];
  favoritePokemon: number;
  description: string;
  badges: number[];
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
      title: "Campeã de Hoenn",
      gymType: "Água e Dragão",
      trainerImage: "noemi.gif",
      favoritePokemon: 9,
      description:
        "Crescida à beira-mar, Noemi encontrou nas águas profundas a força e a calma necessárias para superar qualquer desafio. Sua conexão com Pokémon aquáticos é natural e indestrutível.",
      badges: [1, 20, 3, 4, 5, 6, 7, 8, 9, 10],
      mainTeam: [
        { id: 9, name: "blastoise" },
        { id: 445, name: "garchomp" },
        { id: 612, name: "haxorus " },
        { id: 384, name: "rayquaza" },
        { id: 260, name: "swampert" },
        { id: 395, name: "empoleon " },
      ],
    },
    {
      id: "willian",
      name: "Willian Rodrigues",
      username: "@will",
      title: "Líder das Chamas",
      gymType: "Fogo",
      trainerImage: "willian.gif",
      favoritePokemon: 6,
      description:
        "Will acredita que o fogo representa determinação absoluta. Quando sua equipe entra em batalha, as chamas se tornam uma promessa de vitória.",
      badges: [9, 10, 11, 12, 13, 14, 15, 16],
      mainTeam: [
        { id: 59, name: "arcanine" },
        { id: 38, name: "ninetales" },
        { id: 6, name: "charizard" },
        { id: 78, name: "rapidash" },
        { id: 136, name: "flareon" },
        { id: 126, name: "magmar" },
      ],
    },
    {
      id: "ricardo",
      name: "Ricardo Nery",
      username: "@ricardo",
      title: "Treinador Além das Aparências",
      gymType: "Water/Normal",
      trainerImage: "ricardo.gif",
      favoritePokemon: 129,
      description:
        "Ricardo domina a arte de enxergar o potencial oculto. Para ele, mesmo o Pokémon mais subestimado pode se tornar uma lenda.",
      badges: [1, 2, 3, 4, 5, 6, 7, 8],
      mainTeam: [
        { id: 129, name: "magikarp" },
        { id: 130, name: "gyarados" },
        { id: 9, name: "blastoise" },
        { id: 279, name: "pelipper" },
        { id: 119, name: "seaking" },
        { id: 340, name: "whiscash" },
      ],
    },
    {
      id: "pedro",
      name: "Pedro Mota",
      username: "@pedro",
      title: "Mestre dos Céus Flamejantes",
      gymType: "Fogo e Voo",
      trainerImage: "pedro.gif",
      favoritePokemon: 373,
      description:
        "As batalhas de Pedro acontecem entre o céu e o fogo. Sua força vem da liberdade, intensidade e velocidade de sua equipe.",
      badges: [1, 3, 5, 7, 8],
      mainTeam: [
        { id: 6, name: "charizard" },
        { id: 373, name: "salamence" },
        { id: 59, name: "arcanine" },
        { id: 94, name: "gengar" },
        { id: 142, name: "aerodactyl" },
        { id: 157, name: "typhlosion" },
      ],
    },
    {
      id: "artur",
      name: "Artur Uchôa",
      username: "@artur",
      title: "Sombra dos Sonhos Perdidos",
      gymType: "Fantasma",
      trainerImage: "artur.gif",
      favoritePokemon: 487,
      description:
        "Artur luta além do véu do sono e da realidade. Seus Pokémon fantasma surgem das sombras e atacam quando menos se espera.",
      badges: [3, 5, 6, 8],
      mainTeam: [
        { id: 94, name: "gengar" },
        { id: 200, name: "mismagius" },
        { id: 356, name: "dusclops" },
        { id: 609, name: "chandelure" },
        { id: 354, name: "banette" },
        { id: 487, name: "giratina" },
      ],
    },
  ],
}));