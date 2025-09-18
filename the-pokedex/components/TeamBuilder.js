import { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { createTeam, updateTeam } from "../api/team";
import styles from "./teamBuilder.module.css";

const PokeballIcon = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2,50 a48,48 0 1,1 96,0"
      fill="#FF0000"
      stroke="black"
      strokeWidth="4"
    />
    <path
      d="M2,50 a48,48 0 1,0 96,0"
      fill="#FFFFFF"
      stroke="black"
      strokeWidth="4"
    />
    <rect x="0" y="45" width="100" height="10" fill="black" />
    <circle
      cx="50"
      cy="50"
      r="10"
      fill="white"
      stroke="black"
      strokeWidth="3"
    />
  </svg>
);

const TeamBuilder = forwardRef((props, ref) => {
  const [team, setTeam] = useState([null, null, null, null, null, null]);
  const [teamName, setTeamName] = useState("");

function loadTeam(pokemons, name) {
  const fullTeam = [...pokemons];
  while (fullTeam.length < 6) {
    fullTeam.push(null);
  }

  setTeam(fullTeam);
  setTeamName(name);
}

  

  function addPokemon(pokemon) {
    const index = team.findIndex((p) => p === null);
    if (index === -1) return alert("Seu time já tem 6 pokémons!");
    const newTeam = [...team];
    newTeam[index] = pokemon;
    setTeam(newTeam);
  }

  function removePokemon(index) {
    const newTeam = [...team];
    newTeam.splice(index, 1);
    newTeam.push(null);
    setTeam(newTeam);
  }

  async function saveTeam() {
    if (!teamName) {
      alert("Digite o nome do time!");
      return;
    }

    const pokemons = team.filter((p) => p !== null);

    try {
      if (props.editingTeamId) {
        
        await updateTeam(props.editingTeamId, pokemons);
        alert(`Time "${teamName}" atualizado com sucesso!`);
      } else {
      
        await createTeam(teamName, pokemons);
        alert(`Time "${teamName}" criado com sucesso!`);
      }
    } catch (err) {
      console.error("Erro ao salvar time:", err);
      alert("Erro ao salvar o time. Tente novamente.");
    }
  }
  useImperativeHandle(ref, () => ({
    addPokemon,
    loadTeam,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Seu Time</h2>
      <input
        type="text"
        placeholder="Nome do time"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className={styles.inputTrainer}
      />
      <div className={styles.grid}>
        {team.map((p, i) => (
          <div key={i} className={styles.slot}>
            {p ? (
              <Image
                src={p.image}
                alt={p.name}
                width={70}
                height={70}
                className={styles.slotImage}
                onClick={() => removePokemon(i)}
              />
            ) : (
              <PokeballIcon color="#FF1C1C" />
            )}
          </div>
        ))}
      </div>
      <button onClick={saveTeam} className={styles.buttonSave}>
        Salvar Time
      </button>
    </div>
  );
});

TeamBuilder.displayName = "TeamBuilder";

export default TeamBuilder;
