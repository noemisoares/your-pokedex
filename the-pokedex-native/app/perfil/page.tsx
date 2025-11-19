import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useUserStore } from "../store/useUserStore";
import Teams from "@/components/Teams";
import { useRouter } from "expo-router";

export default function Perfil() {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const setEditingTeam = useUserStore((s) => s.setEditingTeam);
  const router = useRouter();

  console.log("[Perfil] render - user.trainerName=", user?.trainerName);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Perfil de {user.trainerName}</Text>
      </View>
      <View style={styles.teams}>
        <Teams
          trainerName={user.trainerName}
          onEditTeam={(team) => {
            console.log(
              "[Perfil] onEditTeam -> set editingTeam and navigate",
              team
            );
            setEditingTeam(team);
            router.push("/pokedex/page");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  header: {
    padding: 16,
    paddingBottom: 0,
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
  teams: {
    paddingHorizontal: 16,
    width: "100%",
    flex: 1,
  },
  teamBuilderWrapper: {
    maxHeight: 340,
  },
  teamsList: {
    flex: 1,
  },
});
