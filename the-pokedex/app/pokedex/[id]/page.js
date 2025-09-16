"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from "./page.module.css";

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchPokemonData = async () => {
        try {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          setPokemon(pokemonResponse.data);

          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          setSpecies(speciesResponse.data);

          const evolutionResponse = await axios.get(
            speciesResponse.data.evolution_chain.url
          );
          setEvolutionChain(evolutionResponse.data);

          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      fetchPokemonData();
    }
  }, [id]);

  const getEvolutions = (chain) => {
    const evolutions = [];

    const addEvolution = (pokemon) => {
      evolutions.push({
        name: pokemon.species.name,
        id: pokemon.species.url.split("/")[6],
      });

      if (pokemon.evolves_to.length > 0) {
        pokemon.evolves_to.forEach((evolution) => addEvolution(evolution));
      }
    };

    if (chain) {
      addEvolution(chain.chain);
    }

    return evolutions;
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (!pokemon) {
    return <div className={styles.error}>Pokémon não encontrado</div>;
  }

  const evolutions = getEvolutions(evolutionChain);

  return (
    <main className={styles.container}>
      <div className={styles.pokemonCard}>
        <h1 className={styles.title}>{pokemon.name}</h1>
        <img
          src={
            pokemon.sprites?.front_default ||
            pokemon.sprites?.other?.["official-artwork"]?.front_default
          }
          alt={pokemon.name}
          className={styles.pokemonImage}
        />

        <div className={styles.stats}>
          <h3>Stats Base:</h3>
          {pokemon.stats && pokemon.stats.length > 0 ? (
            pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className={styles.statItem}>
                <span>{stat.stat.name.replace("-", " ")}:</span>
                <span>{stat.base_stat}</span>
              </div>
            ))
          ) : (
            <p>Stats não disponíveis</p>
          )}
        </div>

        <div className={styles.moves}>
          <h3>Movimentos:</h3>
          <div className={styles.movesList}>
            {pokemon.moves && pokemon.moves.length > 0 ? (
              pokemon.moves.slice(0, 10).map((moveData) => (
                <span key={moveData.move.name} className={styles.moveItem}>
                  {moveData.move.name.replace("-", " ")}
                </span>
              ))
            ) : (
              <p>Movimentos não disponíveis</p>
            )}
          </div>
        </div>

        <div className={styles.evolutions}>
          <h3>Evoluções:</h3>
          <div className={styles.evolutionsList}>
            {evolutions && evolutions.length > 0 ? (
              evolutions.map((evolution) => (
                <Link
                  key={evolution.id}
                  href={`/pokedex/${evolution.id}`}
                  className={styles.evolutionLink}
                >
                  {evolution.name}
                </Link>
              ))
            ) : (
              <p>Evoluções não disponíveis</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
