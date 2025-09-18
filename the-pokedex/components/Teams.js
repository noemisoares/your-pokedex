"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTeamsByTrainer, getAllTeams, deleteTeam } from "../api/team";
import styles from "./teams.module.css";
import { Trash, Pencil } from "lucide-react";

const Times = ({ trainerName, onEditTeam }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      let response;
      if (trainerName) {
        response = await getTeamsByTrainer(trainerName);
      } else {
        response = await getAllTeams();
      }
      setTeams(response.data.results || []);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [trainerName]);

  if (loading) return <div>Carregando times...</div>;
  if (!teams.length) return <div>Nenhum time encontrado.</div>;

   const handleDelete = async (teamId, teamName) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `Tem certeza de que deseja deletar o time "${teamName}" ?`
    );

    if (!confirmDelete) return; // se cancelar, não faz nada

    try {
      await deleteTeam(teamId);
      alert(`Time "${teamName}" deletado com sucesso!`);
      fetchTeams(); // recarrega a lista após deletar
    } catch (error) {
      console.error("Erro ao deletar time:", error);
      alert("Erro ao deletar time.");
    }
  };


  return (
    <div className={styles.timesContainer}>
      {teams.map((team) => (
        <div key={team.objectId} className={styles.teamCard}>
          <h3 className={styles.teamName}>{team.teamName}</h3>

          <button
            className={styles.editButton}
            onClick={(e) => {
            e.stopPropagation(); // impede que clique no card dispare outros eventos
            onEditTeam && onEditTeam(team);
            }}
          >
            <Pencil size={20} color="blue" />
          </button>
          <button
            className={styles.deleteButton}
            onClick={(e) => handleDelete(team.objectId, team.teamName, e)}
          >
            <Trash size={20} color="red" />
          </button>
          <div className={styles.pokemons}>
            {team.pokemons.map((p, i) => (
              <div key={i} className={styles.pokemon}>
                <Image src={p.image} alt={p.name} width={40} height={40} />
                <span>{p.name}</span>
              </div>

            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Times;
