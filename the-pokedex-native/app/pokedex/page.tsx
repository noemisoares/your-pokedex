import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import TeamBuilder from "@/components/TeamBuilder";
import { useUserStore } from "../store/useUserStore";

export default function Pokedex() {
  const user = useUserStore((state) => state.user);

  const [pokemons, setPokemons] = useState<any[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const teamBuilderRef = useRef<any>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = response.data.results;

        const pokemonWithDetails = await Promise.all(
          pokemonList.map(async (_pokemon: any, index: number) => {
            const id = index + 1;
            try {
              const detailResponse = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${id}`
              );
              return {
                id,
                name: detailResponse.data.name,
                types: detailResponse.data.types,
              };
            } catch {
              return { id, name: `pokemon-${id}`, types: [] };
            }
          })
        );

        setPokemons(pokemonWithDetails);
        setFilteredPokemons(pokemonWithDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    let filtered = pokemons;

    if (searchTerm) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((t: any) => t.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  const handleAddToTeam = (poke: any) => {
    const pokeData = {
      id: poke.id,
      name: poke.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${poke.id}.png`,
    };

    if (teamBuilderRef.current) {
      teamBuilderRef.current.addPokemon(pokeData);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ffcb05" />
        <Text style={styles.loadingText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredPokemons}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          {user && !user.anonymous && (
            <TeamBuilder
              ref={teamBuilderRef}
            />
          )}

          <Text style={styles.title}>Pokédex</Text>
          <TextInput
            placeholder="Buscar Pokémon..."
            placeholderTextColor="#888"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
          />
          <FlatList
            data={allTypes}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeScroll}
            renderItem={({ item: type }) => (
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  selectedType === type && styles.typeButtonActive,
                ]}
                onPress={() =>
                  setSelectedType(selectedType === type ? "" : type)
                }
              >
                <Text style={styles.typeButtonText}>{capitalize(type)}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      }
      renderItem={({ item: poke }) => {
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${poke.id}.png`;

        return (
          <View style={styles.card}>
            <Link
              href={{
                pathname: "/pokedex/[id]/page",
                params: { id: poke.id.toString() },
              }}
              asChild
            >
              <TouchableOpacity style={styles.cardLink}>
                <Image
                  source={{ uri: img }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                />
                <Text style={styles.pokemonName}>{capitalize(poke.name)}</Text>

                <View style={styles.types}>
                  {poke.types.map((t: any, idx: number) => (
                    <View
                      key={idx}
                      style={[
                        styles.typeTag,
                        { backgroundColor: getTypeColor(t.type.name) },
                      ]}
                    >
                      <Text style={styles.typeText}>
                        {capitalize(t.type.name)}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            </Link>

            {user && !user.anonymous && (
              <TouchableOpacity
                onPress={() => handleAddToTeam(poke)}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Adicionar ao Time</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#0c0c0c" },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c0c0c",
  },
  loadingText: { color: "#fff", marginTop: 12, fontSize: 16 },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 12,
  },
  searchInput: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  typeScroll: { paddingBottom: 12 },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#333",
    marginRight: 8,
  },
  typeButtonActive: { backgroundColor: "#ffcb05" },
  typeButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    width: 160,
    margin: 8,
    alignItems: "center",
    padding: 12,
  },
  cardLink: { alignItems: "center" },
  pokemonImage: { width: 80, height: 80 },
  pokemonName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 4,
  },
  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  typeTag: {
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  typeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#3cb043",
    borderRadius: 8,
    paddingVertical: 8,
    width: "100%",
  },
  saveButtonText: { textAlign: "center", color: "#fff", fontWeight: "bold" },
});
