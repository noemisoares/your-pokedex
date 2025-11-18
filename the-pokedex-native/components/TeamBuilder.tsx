import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { createTeam, updateTeam } from "../app/api/team";
import { useUserStore } from "../app/store/useUserStore";

const PokeballIcon = ({ size = 60 }: { size?: number }) => {
  const border = size * 0.05;
  const buttonSize = size * 0.35;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        borderWidth: border,
        borderColor: "#000",
        position: "relative",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "red" }} />

      <View style={{ height: size * 0.12, backgroundColor: "black" }} />

      <View style={{ flex: 1, backgroundColor: "white" }} />

      <View
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: buttonSize,
          height: buttonSize,
          marginLeft: -(buttonSize / 2),
          marginTop: -(buttonSize / 2),
          borderRadius: buttonSize / 2,
          backgroundColor: "white",
          borderWidth: border,
          borderColor: "black",
        }}
      />
    </View>
  );
};

export type Pokemon = {
  id: string;
  name: string;
  image: string;
};

type TeamBuilderProps = {
  editingTeamId?: string;
};

export type TeamBuilderRef = {
  addPokemon: (pokemon: Pokemon) => void;
  loadTeam: (pokemons: (Pokemon | null)[], name: string) => void;
};

const TeamBuilder = forwardRef<TeamBuilderRef, TeamBuilderProps>(
  ({ editingTeamId }, ref) => {
    const user = useUserStore((state) => state.user);

    const [team, setTeam] = useState<(Pokemon | null)[]>([
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    const [teamName, setTeamName] = useState("");
    const [saving, setSaving] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const loadTeam = (pokemons: (Pokemon | null)[], name: string) => {
      const fullTeam = [...pokemons];
      while (fullTeam.length < 6) fullTeam.push(null);
      setTeam(fullTeam);
      setTeamName(name);
    };

    const addPokemon = (pokemon: Pokemon) => {
      const index = team.findIndex((p) => p === null);
      if (index === -1) {
        Alert.alert("Aviso", "Seu time já tem 6 pokémons!");
        return;
      }
      const newTeam = [...team];
      newTeam[index] = pokemon;
      setTeam(newTeam);
    };

    const removePokemon = (index: number) => {
      const newTeam = [...team];
      newTeam.splice(index, 1);
      newTeam.push(null);
      setTeam(newTeam);
    };

    const saveTeam = async () => {
      if (!teamName.trim()) {
        Alert.alert("Erro", "Digite o nome do time!");
        return;
      }

      if (!user?.trainerName) {
        Alert.alert("Erro", "Você precisa estar logado para salvar um time!");
        return;
      }

      const pokemons = team.filter((p): p is Pokemon => p !== null);

      setSaving(true);
      try {
        const pokemonsToSend = pokemons.map((p) => ({
          ...p,
          id: Number(p.id),
        }));

        if (editingTeamId) {
          await updateTeam(editingTeamId, pokemonsToSend, teamName);
          Alert.alert("Sucesso", `Time "${teamName}" atualizado com sucesso!`);
        } else {
          await createTeam(teamName, pokemonsToSend, user.trainerName);
          Alert.alert("Sucesso", `Time "${teamName}" criado com sucesso!`);
        }

        setTeam([null, null, null, null, null, null]);
        setTeamName("");
      } catch (err) {
        console.error(err);
        Alert.alert("Erro", "Erro ao salvar o time. Tente novamente.");
      } finally {
        setSaving(false);
      }
    };

    useImperativeHandle(ref, () => ({
      addPokemon,
      loadTeam,
    }));

    if (!mounted) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#13b01bff" />
          <Text>Carregando...</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crie seu Time</Text>
        <TextInput
          placeholder="Nome do time"
          placeholderTextColor="#888"
          value={teamName}
          cursorColor="#888"
          onChangeText={setTeamName}
          style={styles.inputTrainer}
        />

        <View style={styles.grid}>
          {team.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={styles.slot}
              onPress={() => p && removePokemon(i)}
            >
              {p ? (
                <Image
                  source={{ uri: p.image }}
                  style={styles.slotImage}
                  resizeMode="contain"
                />
              ) : (
                <PokeballIcon />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={saveTeam}
          style={[styles.buttonSave, saving && { opacity: 0.6 }]}
          disabled={saving}
        >
          <Text style={styles.buttonSaveText}>
            {saving ? "Salvando..." : "Salvar Time"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
);

TeamBuilder.displayName = "TeamBuilder";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputTrainer: {
    color: "#888",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    maxWidth: 300,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  slot: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#888",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  slotImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  buttonSave: {
    backgroundColor: "#4db152",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TeamBuilder;
