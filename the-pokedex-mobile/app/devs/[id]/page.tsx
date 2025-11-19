import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useDevs } from "../../store/useDevs";
import DevProfile from "../../../components/DevProfile";

export default function DevProfilePage() {
  const { id } = useLocalSearchParams();
  const dev = useDevs((s) => s.devs.find((d) => d.id === id));

  if (!dev) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "#fff" }}>Desenvolvedor não encontrado.</Text>
      </View>
    );
  }

  return <DevProfile dev={dev} />;
}
