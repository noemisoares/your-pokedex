"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getTeamsByTrainer, getAllTeams } from "../api/team";
import styles from "./teams.module.css";

const Times = ({ trainerName }) => {
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

  return (
    <div className={styles.timesContainer}>
      {teams.map((team) => (
        <div key={team.objectId} className={styles.teamCard}>
          <h3 className={styles.teamName}>{team.teamName}</h3>
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
