import instance, { Pokemon } from "./backend";

export async function createTeam(
  teamName: string,
  pokemons: Pokemon[],
  trainerName: string
) {
  return instance.post("/classes/Team", {
    teamName,
    pokemons,
    trainerName,
  });
}

export const getTeamsByTrainer = async (trainerName: string) => {
  const response = await instance.get("/classes/Team", {
    params: {
      where: JSON.stringify({ trainerName }),
    },
  });
  return response;
};

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

export default {};
