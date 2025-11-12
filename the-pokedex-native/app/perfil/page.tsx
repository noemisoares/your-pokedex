import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useUserStore } from "../../app/store/useUserStore";
import Teams from "@/components/Teams";

export default function Perfil() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento do perfil, pode ajustar se precisar buscar dados extras
    const timer = setTimeout(() => setLoading(false), 500); // meia seg de delay
    return () => clearTimeout(timer);
  }, []);

  if (!user?.username) {
    return (
      <View style={styles.centered}>
        <Text style={styles.warningText}>
          Você precisa estar logado para acessar seu perfil.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4db152" />
        <Text style={{ color: "#fff", marginTop: 8 }}>
          Carregando perfil...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfil de {user.trainerName}</Text>

      {/* Mostra apenas os times do usuário logado */}
      <Teams trainerName={user.trainerName} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0c0c0c",
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0c0c",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  warningText: {
    color: "#ff5555",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});
