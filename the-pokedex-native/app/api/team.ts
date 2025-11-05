import instance from "./index";
import { Pokemon } from "./index";

export async function createTeam(teamName: string, pokemons: Pokemon[]) {
  return instance.post("/classes/Team", { teamName, pokemons });
}

export async function getTeamsByTrainer(teamName: string) {
  return instance.get(
    `/classes/Team?where=${encodeURIComponent(JSON.stringify({ teamName }))}`
  );
}

export async function updateTeam(
  teamId: string,
  pokemons: Pokemon[],
  teamName: string
) {
  return instance.put(`/classes/Team/${teamId}`, { pokemons, teamName });
}

export async function deleteTeam(teamId: string) {
  return instance.delete(`/classes/Team/${teamId}`);
}

export async function getAllTeams() {
  return instance.get("/classes/Team");
}

// ✅ Default export para evitar o warning do Expo Router
export default {};
