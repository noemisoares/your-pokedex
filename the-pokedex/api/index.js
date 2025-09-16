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
  const sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken) throw new Error("Usuário não logado.");

  try {
    const response = await instance.post(
      "/classes/FavoritePokemon",
      {
        name: pokemon.name,
        pokemonId: pokemon.id,
        image: pokemon.image,
      },
      {
        headers: {
          "X-Parse-Session-Token": sessionToken,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFavorites() {
  const sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken) throw new Error("Usuário não logado.");

  try {
    const response = await instance.get("/classes/FavoritePokemon", {
      headers: {
        "X-Parse-Session-Token": sessionToken,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error.response?.data || error);
    throw error;
  }
}

export async function signUp(username, password, email) {
  try {
    const response = await instance.post("/users", {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar:", error.response?.data || error);
    throw error;
  }
}

export async function login(username, password) {
  try {
    const response = await instance.get("/login", {
      params: { username, password },
    });

    localStorage.setItem("sessionToken", response.data.sessionToken);
    localStorage.setItem("userId", response.data.objectId);

    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error);
    throw error;
  }
}

export async function logout() {
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("userId");
}

export function getCurrentUser() {
  const sessionToken = localStorage.getItem("sessionToken");
  const userId = localStorage.getItem("userId");

  if (!sessionToken || !userId) return null;
  return { sessionToken, userId };
}