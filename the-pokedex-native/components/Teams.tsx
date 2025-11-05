import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { getTeamsByTrainer, getAllTeams, deleteTeam } from "../app/api/team";
import { Pencil, Trash } from "lucide-react-native";

interface Pokemon {
  name: string;
  image: string;
}

interface Team {
  objectId: string;
  teamName: string;
  pokemons: Pokemon[];
}

interface TimesProps {
  trainerName?: string;
  onEditTeam?: (team: Team) => void;
}

const Times: React.FC<TimesProps> = ({ trainerName, onEditTeam }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      let response;
      if (trainerName) {
        response = await getTeamsByTrainer(trainerName);
      } else {
        response = await getAllTeams();
      }
      setTeams(response.data.results || []);
    } catch (error) {
      console.error("Erro ao buscar times:", error);
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [trainerName]);

  const handleDelete = async (teamId: string, teamName: string) => {
    Alert.alert("Confirmação", `Deseja deletar o time "${teamName}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTeam(teamId);
            Alert.alert("Sucesso", `Time "${teamName}" deletado!`);
            fetchTeams();
          } catch (error) {
            console.error("Erro ao deletar time:", error);
            Alert.alert("Erro", "Erro ao deletar time.");
          }
        },
      },
    ]);
  };

  const renderTeam = ({ item }: { item: Team }) => (
    <View style={styles.teamCard}>
      <Text style={styles.teamName}>{item.teamName}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => onEditTeam && onEditTeam(item)}
          style={styles.iconButton}
        >
          <Pencil size={20} color="#4db152" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.objectId, item.teamName)}
          style={styles.iconButton}
        >
          <Trash size={20} color="#e74c3c" />
        </TouchableOpacity>
      </View>

      <View style={styles.pokemons}>
        {item.pokemons.map((p, i) => (
          <View key={i} style={styles.pokemon}>
            <Image
              source={{ uri: p.image }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
            <Text style={styles.pokemonName}>{p.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4db152" />
        <Text style={{ color: "#fff", marginTop: 8 }}>Carregando times...</Text>
      </View>
    );
  }

  if (!teams.length) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#fff" }}>Nenhum time encontrado.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={teams}
      renderItem={renderTeam}
      keyExtractor={(item) => item.objectId}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default Times;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teamCard: {
    borderWidth: 0.5,
    borderColor: "#888",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#1e1e1e",
    marginBottom: 16,
  },
  teamName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  pokemons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pokemon: {
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
    width: 60,
  },
  pokemonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pokemonName: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});
