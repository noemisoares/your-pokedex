import { View, Text, StyleSheet, FlatList } from "react-native";
import { Dev } from "../app/store/useDevs";

type Props = {
  dev: Dev;
};

export default function DevProfile({ dev }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{dev.name}</Text>
      <Text style={styles.username}>{dev.username}</Text>
      <Text style={styles.section}>
        Líder de Ginásio: <Text style={styles.highlight}>{dev.gymType}</Text>
      </Text>
      <Text style={styles.section}>
        Título: <Text style={styles.highlight}>{dev.title}</Text>
      </Text>

      <Text style={[styles.section, { marginTop: 20 }]}>Pokémon Favorito:</Text>
      <Text style={styles.favorite}>{dev.favoritePokemon}</Text>

      <Text style={[styles.section, { marginTop: 20 }]}>Time Principal:</Text>

      <FlatList
        data={dev.mainTeam}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Text style={styles.teamMember}>• {item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  name: { color: "#fff", fontSize: 26, fontWeight: "700" },
  username: { color: "#aaa", fontSize: 14, marginBottom: 20 },
  section: { color: "#ddd", fontSize: 16, marginTop: 8 },
  highlight: { color: "#4db152", fontWeight: "600" },
  favorite: { color: "#fff", fontSize: 18, marginTop: 4 },
  teamMember: { color: "#bbb", paddingLeft: 10, marginTop: 6 },
});