import instance from "./index";

export async function createTeam(trainerName, pokemons) {
  return instance.post("/classes/Team", { trainerName, pokemons });
}

export async function getTeamsByTrainer(trainerName) {
  return instance.get(
    `/classes/Team?where=${encodeURIComponent(JSON.stringify({ trainerName }))}`
  );
}

export async function updateTeam(teamId, pokemons) {
  return instance.put(`/classes/Team/${teamId}`, { pokemons });
}

export async function deleteTeam(teamId) {
  return instance.delete(`/classes/Team/${teamId}`);
}
