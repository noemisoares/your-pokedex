import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com",
  timeout: 1000,
  headers: {
    "X-Parse-Application-Id": "Ew3CNMc2s5Wh4aG65rtJ4p1eGHLI0SJwQpDVOZ3T",
    "X-Parse-JavaScript-Key": "TJY7Mtg5y58vjDrkMQ7eusEkpS4wGtGfdbbsMGtr",
    "Content-Type": "application/json",
  },
});

export async function getTasks() {
  const response = await instance.get("/classes/Task");
  return response.data;
}

export async function saveFavorite(pokemon) {
  try {
    const response = await instance.post("/classes/FavoritePokemon", {
      name: pokemon.name,
      pokemonId: pokemon.id,
      image: pokemon.image,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}