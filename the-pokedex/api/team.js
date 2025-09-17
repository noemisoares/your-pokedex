import instance from "./index";

export async function createTeam(teamName, pokemons) {
  return instance.post("/classes/Team", { teamName, pokemons });
}

export async function getTeamsByTrainer(teamName) {
  return instance.get(
    `/classes/Team?where=${encodeURIComponent(JSON.stringify({ teamName }))}`
  );
}

export async function updateTeam(teamId, pokemons) {
  return instance.put(`/classes/Team/${teamId}`, { pokemons });
}

export async function deleteTeam(teamId) {
  return instance.delete(`/classes/Team/${teamId}`);
}
