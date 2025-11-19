import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
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

  const ballMap: Record<string, string> = {
    noemi: "master-ball",
    willian: "great-ball",
    ricardo: "ultra-ball",
    pedro: "premier-ball",
    artur: "luxury-ball",
  };

  const ballImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${ballMap[dev.id]}.png`;

  return (
    <TouchableOpacity style={styles.card} onPress={openProfile}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{dev.name}</Text>
          <Text style={styles.username}>{dev.username}</Text>
          <Text style={styles.more}>Ver perfil →</Text>
        </View>

        <Image source={{ uri: ballImageUrl }} style={styles.ball} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#101015",
    marginBottom: 15,
    padding: 20,
    borderRadius: 16,
    borderColor: "#3a3a3d",
    borderWidth: 1,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "700" 
  },
  username: { 
    color: "#888", 
    fontSize: 14, 
    marginTop: 4 
  },
  more: { 
    color: "#d12727d6", 
    marginTop: 12, 
    fontWeight: "600" 
  },
  ball: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
});
