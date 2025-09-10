"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { saveFavorite } from "../../api/index";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async (poke, id) => {
    try {
      const pokemonData = {
        id: id,
        name: poke.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      };
      await saveFavorite(pokemonData);
      alert(`${poke.name} salvo com sucesso!`);
    } catch (error) {
      alert("Erro ao salvar o Pokemon.");
      console.error(error);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.grid}>
        {pokemons.map((poke, index) => {
          const id = index + 1;
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div key={id} className={styles.card}>
              <img src={img} alt={poke.name} />
              <p>{poke.name}</p>
             <button onClick={() => handleSave(poke, id)} className={styles.saveButton}>
                Salvar
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
