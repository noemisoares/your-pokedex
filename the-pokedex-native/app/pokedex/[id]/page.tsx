import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolutionChain, setEvolutionChain] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const evolutionResponse = await axios.get(
            speciesResponse.data.evolution_chain.url
          );

          setPokemon(pokemonResponse.data);
          setEvolutionChain(evolutionResponse.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getPokemonSprite = (pokemonId: string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`;

  const getEvolutions = (chain: any) => {
    const evolutions: any[] = [];
    const addEvolution = (pokemon: any, level = 0) => {
      evolutions.push({
        name: pokemon.species.name,
        id: pokemon.species.url.split("/")[6],
        level,
      });
      if (pokemon.evolves_to.length > 0) {
        pokemon.evolves_to.forEach((evolution: any) =>
          addEvolution(evolution, level + 1)
        );
      }
    };
    if (chain) addEvolution(chain.chain);
    return evolutions.sort((a, b) => a.level - b.level);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4db152" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Pokémon não encontrado</Text>
      </View>
    );
  }

  const evolutions = getEvolutions(evolutionChain);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar à Pokédex</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>{capitalize(pokemon.name)}</Text>
        <Image
          source={{ uri: getPokemonSprite(String(id)) }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />

        <View style={styles.stats}>
          <Text style={styles.sectionTitle}>Stats Base:</Text>
          {pokemon.stats?.map((stat: any) => (
            <View key={stat.stat.name} style={styles.statItem}>
              <Text style={styles.statLabel}>
                {capitalize(stat.stat.name.replace("-", " "))}:
              </Text>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.moves}>
          <Text style={styles.sectionTitle}>Movimentos:</Text>
          <View style={styles.movesList}>
            {pokemon.moves?.slice(0, 10).map((moveData: any) => (
              <View key={moveData.move.name} style={styles.moveItem}>
                <Text style={styles.moveText}>
                  {capitalize(moveData.move.name.replace("-", " "))}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.evolutions}>
          <Text style={styles.sectionTitle}>Evoluções:</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.evolutionsList}
            showsHorizontalScrollIndicator={false}
          >
            {evolutions.map((evolution, index) => (
              <View key={evolution.id} style={styles.evolutionContainer}>
                <TouchableOpacity
                  style={styles.evolutionCard}
                  onPress={() =>
                    router.push({
                      pathname: "/pokedex/[id]/page",
                      params: { id: evolution.id.toString() },
                    })
                  }
                >
                  <Image
                    source={{
                      uri: getPokemonSprite(evolution.id),
                    }}
                    style={styles.evolutionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.evolutionName}>
                    {capitalize(evolution.name)}
                  </Text>
                </TouchableOpacity>
                {index < evolutions.length - 1 && (
                  <Text style={styles.evolutionArrow}>→</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#555",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#4db152",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  pokemonImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  stats: {
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  statLabel: {
    color: "#444",
    textTransform: "capitalize",
  },
  statValue: {
    color: "#000",
    fontWeight: "bold",
  },
  moves: {
    width: "100%",
    marginBottom: 20,
  },
  movesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moveItem: {
    backgroundColor: "#cfdcea",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
  },
  moveText: {
    color: "#000",
    fontSize: 14,
  },
  evolutions: {
    width: "100%",
    marginBottom: 20,
  },
  evolutionsList: {
    alignItems: "center",
    paddingVertical: 5,
  },
  evolutionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  evolutionCard: {
    backgroundColor: "#4db152",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
  evolutionImage: {
    width: 60,
    height: 60,
  },
  evolutionName: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 4,
  },
  evolutionArrow: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginHorizontal: 5,
  },
});
