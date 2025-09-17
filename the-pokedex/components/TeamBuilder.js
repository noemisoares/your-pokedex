import { useState, forwardRef, useImperativeHandle } from "react";
import { createTeam } from "../api/team";
import styles from "./teamBuilder.module.css";

const TeamBuilder = forwardRef((props, ref) => {
  const [team, setTeam] = useState([null, null, null, null, null, null]);
  const [trainerName, setTrainerName] = useState("");

  function addPokemon(pokemon) {
    const index = team.findIndex((p) => p === null);
    if (index === -1) return alert("Seu time já tem 6 pokémons!");
    const newTeam = [...team];
    newTeam[index] = pokemon;
    setTeam(newTeam);
  }

  async function saveTeam() {
    if (!trainerName) {
      alert("Digite o nome do treinador!");
      return;
    }
    await createTeam(
      trainerName,
      team.filter((p) => p !== null)
    );
    alert(`Time de ${trainerName} salvo com sucesso!`);
  }

  useImperativeHandle(ref, () => ({
    addPokemon,
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Seu Time</h2>
      <input
        type="text"
        placeholder="Nome do treinador"
        value={trainerName}
        onChange={(e) => setTrainerName(e.target.value)}
        className={styles.inputTrainer}
      />
      <div className={styles.grid}>
        {team.map((p, i) => (
          <div key={i} className={styles.slot}>
            {p ? <img src={p.image} alt={p.name} /> : <span>???</span>}
          </div>
        ))}
      </div>
      <button onClick={saveTeam} className={styles.buttonSave}>
        Salvar Time
      </button>
    </div>
  );
});

export default TeamBuilder;
