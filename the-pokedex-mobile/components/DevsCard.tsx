import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Dev } from "../app/store/useDevs";

type Props = {
  dev: Dev;
};

export default function DevCard({ dev }: Props) {
  function openProfile() {
    router.push({
        pathname: "/devs/[id]/page",
        params: { id: dev.id },
    });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={openProfile}>
      <Text style={styles.name}>{dev.name}</Text>
      <Text style={styles.username}>{dev.username}</Text>
      <Text style={styles.more}>Ver perfil →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1b1b1f",
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    borderColor: "#444",
    borderWidth: 1,
  },
  name: { color: "#fff", fontSize: 18, fontWeight: "600" },
  username: { color: "#aaa", fontSize: 14, marginTop: 4 },
  more: { color: "#4db152", marginTop: 12, fontWeight: "600" },
});
