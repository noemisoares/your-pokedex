import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Pencil, Trash } from "lucide-react-native";
import { Team as StoreTeam, Pokemon } from "../app/store/useUserStore";

interface TeamsProps {
  team: StoreTeam;
  onEditTeam?: (team: StoreTeam) => void;
  onDeleteTeam?: (teamId: string, teamName: string) => void;
}

const Teams: React.FC<TeamsProps> = ({ team, onEditTeam, onDeleteTeam }) => {
  // Preenche até 6 slots
  const pokemonSlots = [...team.pokemons];
  while (pokemonSlots.length < 6) {
    pokemonSlots.push(null as unknown as Pokemon);
  }

  return (
    <View style={styles.teamCard}>
      {/* Faixa superior com nome do time */}
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.teamName}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => onEditTeam && onEditTeam(team)}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Pencil size={20} color="#4db152" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDeleteTeam && onDeleteTeam(team.objectId!, team.teamName)}
            style={styles.iconButton}
            activeOpacity={0.7}
          >
            <Trash size={20} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Área dos Pokémons */}
      <View style={styles.pokemons}>
        {pokemonSlots.map((p, index) =>
          p ? (
            <View key={p.id} style={styles.pokemon}>
              <Image source={{ uri: p.image }} style={styles.pokemonImage} resizeMode="contain" />
              <Text style={styles.pokemonName}>{p.name}</Text>
            </View>
          ) : (
            <View key={`empty-${index}`} style={[styles.pokemon, styles.emptySlot]}>
              <Image
                source={require("@/assets/pokeball_icon.png")}
                style={styles.emptyPokemonImage}
                resizeMode="contain"
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default Teams;

const styles = StyleSheet.create({
  teamCard: {
    backgroundColor: "#161616",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff3b3b33", 
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  teamName: {
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonRow: { flexDirection: "row" },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  pokemons: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  pokemon: {
    alignItems: "center",
    marginBottom: 12,
    width: 50,
  },
  pokemonImage: { width: 40, height: 40, borderRadius: 20, marginRight: 4 },
  pokemonName: { fontSize: 9.5, color: "#fff", textAlign: "center", marginLeft: -4, marginTop: 4 },
  emptySlot: {
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  emptyPokemonImage: {
    width: 30,
    height: 30,
    opacity: 0.3,
  },
});
