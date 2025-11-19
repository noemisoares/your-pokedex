import { View, FlatList } from "react-native";
import { useDevs } from "../store/useDevs";
import DevCard from "../../components/DevsCard";

export default function DevsPage() {
  const devs = useDevs((state) => state.devs);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={devs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DevCard dev={item} />}
      />
    </View>
  );
}
