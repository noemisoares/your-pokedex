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

export async function createUser(
  username: string,
  trainerName: string,
  email: string,
  password: string
) {
  try {
    if (!username.startsWith("@")) {
      throw new Error('O username deve começar com "@"');
    }

    const response = await instance.post("/users", {
      username: username.trim(),
      trainerName: trainerName.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error.response?.data || error);
    throw new Error(
      error.response?.data?.error || "Erro ao criar conta. Tente novamente."
    );
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await instance.get("/login", {
      params: { username: username.trim(), password },
    });

    return {
      objectId: response.data.objectId,
      username: response.data.username,
      trainerName: response.data.trainerName,
      email: response.data.email,
      sessionToken: response.data.sessionToken,
    };
  } catch (error: any) {
    console.error(
      "Erro no login:",
      error.response?.data || error.message || error
    );
    throw new Error("Username ou senha incorretos.");
  }
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
