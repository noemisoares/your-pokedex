import instance from "./index";

export async function createTeam(teamName, pokemons) {
  return instance.post("/classes/Team", { teamName, pokemons });
}

export async function getTeamsByTrainer(teamName) {
  return instance.get(
    `/classes/Team?where=${encodeURIComponent(JSON.stringify({ teamName }))}`
  );
}

//aqui pra will >>>
export async function updateTeam(teamId, pokemons, teamName) {
  return instance.put(`/classes/Team/${teamId}`, { pokemons, teamName});
}

export async function deleteTeam(teamId) {
  return instance.delete(`/classes/Team/${teamId}`);
}
//aqui pra will ^^^

export async function getAllTeams() {
  return instance.get("/classes/Team");
}