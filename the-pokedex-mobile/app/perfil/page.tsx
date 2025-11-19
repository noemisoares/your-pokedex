import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useUserStore } from "../store/useUserStore";
import instance from "../api/backend";
import Teams from "../../components/Teams";
import { useRouter } from "expo-router";

export default function Perfil() {
  const user = useUserStore((state) => state.user);
  const setEditingTeam = useUserStore((s) => s.setEditingTeam);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    if (!user) return;
    loadTeams();
  }, [user]);

  async function loadTeams() {
    try {
      const response = await instance.get("/classes/Team", {
        params: {
          where: JSON.stringify({
            trainerName: user!.trainerName,
          }),
        },
      });

      const fetchedTeams = response.data.results || [];
      setTeams(fetchedTeams);

      const totalTeams = fetchedTeams.length;

      const allPokemons = fetchedTeams.flatMap((t: any) => t.pokemons || []);
      const uniqueIds = new Set(allPokemons.map((p: any) => p.id));
      setPokemonCount(uniqueIds.size);

      setXp(totalTeams * 50);
    } catch (error) {
      console.error("Erro ao carregar times:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Image
          source={require("@/assets/pokeball_icon.png")}
          style={{ width: 130, height: 130 }}
          resizeMode="contain"
        />
        <Text style={styles.notLoggedTitle}>Acesso bloqueado!</Text>
        <Text style={styles.notLoggedSubtitle}>
          Faça login para ver seu perfil de Treinador.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff3b3b" />
        <Text style={{ color: "#fff", marginTop: 8 }}>
          Carregando perfil...
        </Text>
      </View>
    );
  }

  const level = Math.floor(xp / 100) + 1;
  const xpCurrent = xp % 100;
  const xpMax = 100;
  const xpFillPercent = (xpCurrent / xpMax) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: "#0c0c0c" }}>
      <ScrollView>
        {/* BANNER */}
        <View style={styles.banner} />

        {/* CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("@/assets/pokeball_icon.png")}
              style={{ width: 70, height: 70 }}
            />
          </View>

          <Text style={styles.trainerName}>{user.trainerName}</Text>
          <Text style={styles.trainerSubtitle}>Treinador Pokémon</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{teams.length}</Text>
              <Text style={styles.statLabel}>Times</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{pokemonCount}</Text>
              <Text style={styles.statLabel}>Pokémon</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>Lvl {level}</Text>
              <Text style={styles.statLabel}>Treinador</Text>
            </View>
          </View>

          <View style={styles.xpBar}>
            <View style={[styles.xpFill, { width: `${xpFillPercent}%` }]} />
          </View>
          <Text style={styles.xpText}>
            {xpCurrent} XP / {xpMax}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus Times</Text>
        </View>

        {/* Teams sozinho controla a lista */}
        <Teams
          trainerName={user.trainerName}
          onEditTeam={(team) => {
            setEditingTeam(team);
            router.push("/pokedex/page");
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0c0c",
  },
  notLoggedTitle: {
    color: "#fff",
    fontSize: 22,
    marginTop: 16,
    fontWeight: "bold",
  },
  notLoggedSubtitle: {
    color: "#aaaaaa",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  banner: {
    width: "100%",
    height: 140,
    backgroundColor: "#d00000",
    borderBottomWidth: 5,
    borderBottomColor: "#222",
  },
  profileCard: {
    marginTop: -70,
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#161616",
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff3b3b55",
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#222",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  trainerName: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
  },
  trainerSubtitle: {
    color: "#bbbbbb",
    marginTop: 4,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "space-between",
    width: "80%",
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    color: "#ff3b3b",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 13,
  },
  xpBar: {
    width: "80%",
    height: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 14,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    backgroundColor: "#ff3b3b",
  },
  xpText: {
    fontSize: 12,
    color: "#bbb",
    marginTop: 4,
  },
  section: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 26,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#ff3b3b",
    paddingBottom: 6,
  },
});