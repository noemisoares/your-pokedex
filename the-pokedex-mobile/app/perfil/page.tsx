import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList,
  Alert,
  Animated,
} from "react-native";
import { useUserStore, Team, Pokemon } from "../store/useUserStore";
import instance from "../api/backend";
import Teams from "../../components/Teams";
import { useRouter } from "expo-router";

export default function Perfil() {
  const user = useUserStore((state) => state.user);
  const setEditingTeam = useUserStore((s) => s.setEditingTeam);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const maxPokemon = 151;
  const xpPerPokemon = 10;
  const baseXp = 50;

  const xpAnim = useRef(new Animated.Value(0)).current;

  async function loadTeams() {
    try {
      setLoading(true);
      const response = await instance.get("/classes/Team", {
        params: { where: JSON.stringify({ trainerName: user!.trainerName }) },
      });

      const fetchedTeams: Team[] = response.data.results || [];
      setTeams(fetchedTeams);

      const allPokemons: Pokemon[] = fetchedTeams.flatMap((t) => t.pokemons || []);
      const uniqueIds = new Set(allPokemons.map((p) => p.id));
      const totalPokemon = Math.min(uniqueIds.size, maxPokemon);

      setPokemonCount(uniqueIds.size);
      setTotalXp(totalPokemon * xpPerPokemon);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    loadTeams();
  }, [user]);

  useEffect(() => {
    if (totalXp === 0) return;

    let xpAccum = totalXp;
    let levelTemp = 1;
    let xpForNextLevel = baseXp;

    while (xpAccum >= xpForNextLevel) {
      xpAccum -= xpForNextLevel;
      levelTemp++;
      xpForNextLevel += baseXp;
    }

    const fillPercent = (xpAccum / xpForNextLevel) * 100;

    Animated.timing(xpAnim, {
      toValue: fillPercent,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [totalXp]);

  const handleDeleteTeam = (teamId: string, teamName: string) => {
    Alert.alert("Confirmação", `Deseja deletar o time "${teamName}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await instance.delete(`/classes/Team/${teamId}`);
            loadTeams();
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Image source={require("@/assets/pokeball_icon.png")} style={{ width: 130, height: 130 }} />
        <Text style={styles.notLoggedTitle}>Acesso bloqueado!</Text>
        <Text style={styles.notLoggedSubtitle}>Faça login para ver seu perfil de Treinador.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff3b3b" />
        <Text style={{ color: "#fff", marginTop: 8 }}>Carregando perfil...</Text>
      </View>
    );
  }

  let xpAccum = totalXp;
  let level = 1;
  let xpForNextLevel = baseXp;

  while (xpAccum >= xpForNextLevel) {
    xpAccum -= xpForNextLevel;
    level++;
    xpForNextLevel += baseXp;
  }

  const xpCurrent = xpAccum;

  const renderHeader = () => (
    <>
      <View style={styles.banner} />

      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image source={require("@/assets/pokeball_icon.png")} style={{ width: 70, height: 70 }} />
        </View>

        <Text style={styles.trainerName}>{user.trainerName}</Text>
        <Text style={styles.trainerSubtitle}>Treinador Pokémon</Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{teams.length}</Text>
            <Text style={styles.statLabel}>Times</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{pokemonCount}/{maxPokemon}</Text>
            <Text style={styles.statLabel}>Pokémon</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Lvl {level}</Text>
            <Text style={styles.statLabel}>Treinador</Text>
          </View>
        </View>

        <View style={styles.xpBar}>
          <Animated.View style={[styles.xpFill, { width: xpAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }) }]} />
        </View>
        <Text style={styles.xpText}>{xpCurrent} XP / {xpForNextLevel} XP para o próximo nível</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seus Times</Text>
      </View>
    </>
  );

  return (
    <FlatList
      data={teams}
      keyExtractor={(item) => item.objectId!}
      renderItem={({ item }) => (
        <Teams
          team={item}
          onEditTeam={(team) => {
            setEditingTeam(team);
            router.push("/pokedex/page");
          }}
          onDeleteTeam={handleDeleteTeam}
        />
      )}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={{ paddingBottom: 24 }}
      style={{ backgroundColor: "#0c0c0c" }}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={{ color: "#fff" }}>Nenhum time encontrado.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0c0c0c" },
  notLoggedTitle: { color: "#fff", fontSize: 22, marginTop: 16, fontWeight: "bold" },
  notLoggedSubtitle: { color: "#aaa", fontSize: 14, textAlign: "center", marginTop: 4 },
  banner: { width: "100%", height: 140, backgroundColor: "#d00000", borderBottomWidth: 5, borderBottomColor: "#222" },
  profileCard: { marginTop: -70, alignSelf: "center", width: "90%", backgroundColor: "#161616", borderRadius: 16, paddingVertical: 22, alignItems: "center", borderWidth: 2, borderColor: "#ff3b3b55" },
  avatarWrapper: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#222", marginBottom: 10, justifyContent: "center", alignItems: "center" },
  trainerName: { fontSize: 27, color: "#fff", fontWeight: "bold" },
  trainerSubtitle: { color: "#bbbbbb", marginTop: 4, fontSize: 14 },
  statsRow: { flexDirection: "row", marginTop: 18, justifyContent: "space-between", width: "80%" },
  statBox: { alignItems: "center" },
  statNumber: { color: "#ff3b3b", fontSize: 20, fontWeight: "bold" },
  statLabel: { color: "#aaa", fontSize: 13 },
  xpBar: { width: "80%", height: 12, backgroundColor: "#333", borderRadius: 12, marginTop: 14, overflow: "hidden" },
  xpFill: { height: "100%", backgroundColor: "#ff3b3b" },
  xpText: { fontSize: 12, color: "#bbb", marginTop: 4 },
  section: { width: "100%", paddingHorizontal: 20, marginTop: 26, paddingBottom: 24 },
  sectionTitle: { fontSize: 20, color: "#fff", fontWeight: "bold", marginBottom: 12, borderBottomWidth: 2, borderBottomColor: "#ff3b3b", paddingBottom: 6 },
});