"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./page.module.css";
import TeamBuilder from "@/components/TeamBuilder";
import Teams from "@/components/Teams";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const teamBuilderRef = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditTeam = (team) => {
    if (teamBuilderRef.current) {
      teamBuilderRef.current.loadTeam(team.pokemons, team.teamName);
      setEditingTeamId(team.objectId);
    }
  };

  useEffect(() => {
    if (mounted) {
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
          setFilteredPokemons(pokemonWithDetails);
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      fetchPokemonData();
    }
  }, [mounted]);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeInfo) => typeInfo.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  const handleAddToTeam = (poke) => {
    const pokeData = {
      id: poke.id,
      name: poke.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${poke.id}.png`,
    };

    if (teamBuilderRef.current) {
      teamBuilderRef.current.addPokemon(pokeData);
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

  const allTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  if (!mounted || loading) {
    return <div className={styles.loading}>Carregando Pokémon...</div>;
  }

  return (
    <main className={styles.container}>
      <div className={styles.teams}>
        <TeamBuilder ref={teamBuilderRef} editingTeamId={editingTeamId} />
        <Teams onEditTeam={handleEditTeam} />
      </div>

      <h1 className={styles.title}>Pokédex</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className={styles.typeFilter}
        >
          <option value="">Todos os tipos</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredPokemons.map((poke) => {
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
                onClick={() => handleAddToTeam(poke)}
                className={styles.saveButton}
              >
                Adicionar ao Time
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
