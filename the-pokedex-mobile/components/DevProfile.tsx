import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDevs } from "../app/store/useDevs";
import { Image } from "expo-image";

const trainerImages: Record<string, any> = {
  "noemi.gif": require("../assets/devtrainer/noemi.gif"),
  "willian.gif": require("../assets/devtrainer/willian.gif"),
  "ricardo.gif": require("../assets/devtrainer/ricardo.gif"),
  "pedro.gif": require("../assets/devtrainer/pedro.gif"),
  "artur.gif": require("../assets/devtrainer/artur.gif"),
};

export default function DevProfile() {
  const { id } = useLocalSearchParams();
  const dev = useDevs((s) => s.devs.find((d) => d.id === id));

  if (!dev) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Treinador não encontrado.</Text>
      </View>
    );
  }

  const getPokemonSprite = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

  const getBadge = (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/${id}.png`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        <Image
          source={trainerImages[dev.trainerImage]}
          style={styles.trainerImage}
          contentFit="contain"
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{dev.name}</Text>
          <Text style={styles.username}>{dev.username}</Text>
          <Text style={styles.title}>{dev.title}</Text>
          <Text style={styles.gymType}>Tipo: {dev.gymType}</Text>

          {dev.badges?.length > 0 && (
            <View style={styles.badgesRow}>
              {dev.badges.map((b) => (
                <Image
                  key={b}
                  source={{ uri: getBadge(b) }}
                  style={styles.badge}
                />
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.aboutRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.description}>{dev.description || "Sem descrição."}</Text>
        </View>

        {dev.favoritePokemon && (
          <View style={styles.favoriteCard}>
            <Text style={styles.sectionTitle}>Favorito</Text>
            <Image
              source={{ uri: getPokemonSprite(dev.favoritePokemon) }}
              style={styles.favoriteSprite}
            />
          </View>
        )}
      </View>

      <Text style={styles.teamHeading}>Equipe Campeã</Text>

      <View style={styles.teamCard}>
        {dev.mainTeam.map((p) => (
          <View key={p.id} style={styles.pokemonBox}>
            <Image
              source={{ uri: getPokemonSprite(p.id) }}
              style={styles.pokemonSprite}
            />
            <Text style={styles.pokemonName}>{p.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c0c0c",
    padding: 20,
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "#fff",
  },
  headerCard: {
    backgroundColor: "#161616",
    borderRadius: 16,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ff3b3b55",
    padding: 14,
  },
  trainerImage: {
    marginTop: 20, 
    width: 110,
    height: 110,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  username: {
    color: "#bbb",
    marginTop: 2,
  },
  title: {
    color: "#ff3b3b",
    fontSize: 14,
    marginTop: 6,
    fontWeight: "600",
  },
  gymType: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
  badgesRow: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 20,
    flexWrap: "wrap",
  },
  badge: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
  aboutRow: {
    flexDirection: "row",
    marginTop: 24,
  },
  sectionTitle: {
    color: "#ff3b3b",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    color: "#ddd",
    fontSize: 15,
    lineHeight: 20,
  },
  favoriteCard: {
    marginLeft: 16,
    alignItems: "center",
  },
  favoriteSprite: {
    width: 88,
    height: 88,
  },
  teamHeading: {
    fontSize: 20,
    color: "#ff3b3b",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ff3b3b55",
    paddingBottom: 6,
  },
  teamCard: {
    backgroundColor: "#161616",
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: "#ff3b3b55",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pokemonBox: {
    width: "32%",
    alignItems: "center",
    marginBottom: 18,
  },
  pokemonSprite: {
    width: 64,
    height: 64,
  },
  pokemonName: {
    color: "#ccc",
    marginTop: 6,
    textTransform: "capitalize",
  },
});