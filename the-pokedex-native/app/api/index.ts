import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 10000,
  headers: {
    "X-Parse-Application-Id": "Ew3CNMc2s5Wh4aG65rtJ4p1eGHLI0SJwQpDVOZ3T",
    "X-Parse-JavaScript-Key": "TJY7Mtg5y58vjDrkMQ7eusEkpS4wGtGfdbbsMGtr",
    "Content-Type": "application/json",
  },
});

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface Team {
  teamName: string;
  pokemons: Pokemon[];
}

export async function getTasks() {
  const response = await instance.get("/classes/Task");
  return response.data;
}

export async function savePokemon(pokemon: Pokemon) {
  try {
    const response = await instance.post("/classes/FavoritePokemon", {
      name: pokemon.name,
      pokemonId: pokemon.id,
      image: pokemon.image,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar Pokémon:", error);
    throw error;
  }
}

export async function saveTeam(teamName: string, pokemons: Pokemon[]) {
  try {
    const response = await instance.post("/classes/Team", {
      teamName,
      pokemons,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar time:", error);
    throw error;
  }
}

export default instance;
