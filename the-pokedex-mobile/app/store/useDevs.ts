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
      gymType: "Dragão",
      trainerImage: "noemi.gif",
      favoritePokemon: 9,
      description:
        "Noemi cresceu estudando dragões nas montanhas. E os domina com precisão — e, ironicamente, seu parceiro mais leal é um Blastoise, que venceu o respeito dos dragões antes mesmo dela.",
      badges: [17, 18, 19, 20, 21, 22, 23, 24],
      mainTeam: [
        { id: 9, name: "blastoise" },
        { id: 445, name: "garchomp" },
        { id: 612, name: "haxorus " },
        { id: 384, name: "rayquaza" },
        { id: 373, name: "salamence" },
        { id: 635, name: "hydreigon" },
      ],
    },
    {
      id: "willian",
      name: "Willian Rodrigues",
      username: "@will",
      title: "Campeão de Kanto",
      gymType: "Fogo",
      trainerImage: "willian.gif",
      favoritePokemon: 6,
      description:
        "Will acredita que o fogo representa determinação absoluta. Quando sua equipe entra em batalha, as chamas se tornam uma promessa de vitória. Uma vitória que vem da determinação.",
      badges: [1, 2, 3, 4, 5, 6, 7, 8],
      mainTeam: [
        { id: 6, name: "charizard" },
        { id: 392, name: "infernape" },
        { id: 38, name: "ninetales" },
        { id: 250, name: "ho-oh" },
        { id: 229, name: "houndoom" },
        { id: 78, name: "rapidash" },
      ],
    },
    {
      id: "ricardo",
      name: "Ricardo Nery",
      username: "@ricardo",
      title: "Campeão de Johto",
      gymType: "Normal",
      trainerImage: "ricardo.gif",
      favoritePokemon: 133,
      description:
        "Ricardo domina a arte de enxergar o potencial oculto. Para ele, mesmo o Pokémon mais subestimado pode se tornar uma lenda. Não importando se é apenas normal.",
      badges: [9, 10, 11, 12, 13, 14, 15, 16],
      mainTeam: [
        { id: 133, name: "eevee" },
        { id: 143, name: "snorlax" },
        { id: 137, name: "porygon" },
        { id: 493, name: "arceus" },
        { id: 217, name: "ursaring" },
        { id: 235, name: "smeargle" },
      ],
    },
    {
      id: "pedro",
      name: "Pedro Mota",
      username: "@pedro",
      title: "Campeão de Unova",
      gymType: "Água",
      trainerImage: "pedro.gif",
      favoritePokemon: 503,
      description:
        "Pedro vê a água como símbolo de adaptação e serenidade. Quando sua equipe entra em batalha, ondas calmas se transformam em força estratégica — a promessa de vitória flui com equilíbrio.",
      badges: [33, 34, 35, 36, 37, 38, 39, 40],
      mainTeam: [
        { id: 503, name: "samurott" },
        { id: 130, name: "gyarados" },
        { id: 131, name: "lapras" },
        { id: 245, name: "suicune" },
        { id: 350, name: "milotic" },
        { id: 199, name: "slowking" },
      ],
    },
    {
      id: "artur",
      name: "Artur Uchôa",
      username: "@artur",
      title: "Campeão de Sinnoh",
      gymType: "Grama",
      trainerImage: "artur.gif",
      favoritePokemon: 254,
      description:
        "Artur sabe que a natureza é bela, mas implacável. Sob seu comando, a arena é reclamada pela selva: Provando que a força mais antiga do mundo é também a mais forte.",
      badges: [25, 26, 27, 28, 29, 30, 31, 32],
      mainTeam: [
        { id: 254, name: "sceptile" },
        { id: 389, name: "torterra" },
        { id: 286, name: "breloom" },
        { id: 486, name: "regigigas" },
        { id: 497, name: "serperior" },
        { id: 3, name: "venusaur" },
      ],
    },
  ],
}));