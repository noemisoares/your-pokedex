"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css";
import { savePokemon } from "../../api/index";
import TeamBuilder from "@/components/TeamBuilder";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemonList.map(async (pokemon, index) => {
            const id = index + 1;
            try {
              const detailResponse = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}`
              );
              return {
                ...pokemon,
                id: id,
                types: detailResponse.data.types,
              };
            } catch (error) {
              console.error(`Erro ao buscar dados do Pokémon ${id}:`, error);
              return {
                ...pokemon,
                id: id,
                types: [],
              };
            }
          })
        );

        setPokemons(pokemonWithDetails);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSave = async (poke, id) => {
    try {
      const pokemonData = {
        id: id,
        name: poke.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`,
      };
      await savePokemon(pokemonData);
      alert(`${capitalize(poke.name)} salvo com sucesso!`);
    } catch (error) {
      alert("Erro ao salvar o Pokemon.");
      console.error(error);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: "#A8A878",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      grass: "#78C850",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
    };
    return typeColors[type] || "#68A090";
  };

  if (loading) {
    return <div className={styles.loading}>Carregando Pokémon...</div>;
  }

  return (
    <main className={styles.container}>
      <TeamBuilder />

      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.grid}>
        {pokemons.map((poke) => {
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${poke.id}.png`;

          return (
            <div key={poke.id} className={styles.card}>
              <Link href={`/pokedex/${poke.id}`} className={styles.cardLink}>
                <img
                  src={img}
                  alt={poke.name}
                  className={styles.pokemonImage}
                  onError={(e) => {
                    e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`;
                  }}
                />
                <h3 className={styles.pokemonName}>{capitalize(poke.name)}</h3>
                <div className={styles.types}>
                  {poke.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={styles.typeTag}
                      style={{
                        backgroundColor: getTypeColor(typeInfo.type.name),
                      }}
                    >
                      {capitalize(typeInfo.type.name)}
                    </span>
                  ))}
                </div>
              </Link>
              <button
                onClick={() => handleSave(poke, poke.id)}
                className={styles.saveButton}
              >
                Salvar
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
