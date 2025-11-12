import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { createUser, loginUser } from "./api/backend";
import { useUserStore } from "./store/useUserStore";

export default function Home() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [modalVisible, setModalVisible] = useState<"login" | "signup" | null>(
    null
  );
  const [username, setUsername] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAnonymous = () => {
    router.push("/pokedex/page");
  };

  const handleSignup = async () => {
    try {
      const user = await createUser(username, trainerName, email, password);
      Alert.alert(
        "Conta criada!",
        "Agora você pode logar com seu username e senha."
      );
      setModalVisible(null);
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginUser(username, password);
      setUser(user);
      Alert.alert("Bem-vindo!", `Olá ${user.trainerName}`);
      router.push("/perfil/page");
    } catch (err: any) {
      Alert.alert("Erro no login", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.home}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulinho}>Bem-vindo à</Text>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Explore informações sobre todos os Pokémon, descubra tipos,
          habilidades e muito mais!
        </Text>
      </View>

      <Image
        source={require("../assets/images/pikachu.png")}
        style={[styles.pokemonBg, styles.pikachuBg]}
        resizeMode="contain"
      />
      <Image
        source={require("../assets/images/charmander.png")}
        style={[styles.pokemonBg, styles.charmanderBg]}
        resizeMode="contain"
      />
      <Image
        source={require("../assets/images/squirtle.png")}
        style={[styles.pokemonBg, styles.squirtleBg]}
        resizeMode="contain"
      />
      <Image
        source={require("../assets/images/pokedex-color.svg")}
        style={[styles.pokemonBg, styles.pokedexBg]}
        resizeMode="contain"
      />

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.button} onPress={handleAnonymous}>
          <Text style={styles.buttonText}>Entrada Anônima</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible("login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible("signup")}
        >
          <Text style={styles.buttonText}>Criar Conta</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible !== null} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalVisible === "login" ? "Login" : "Criar Conta"}
            </Text>
            {modalVisible === "signup" && (
              <>
                <TextInput
                  placeholder="Nome do treinador"
                  style={styles.input}
                  value={trainerName}
                  onChangeText={setTrainerName}
                />
              </>
            )}
            <TextInput
              placeholder={
                modalVisible === "login" ? "Username (@...)" : "Username (@...)"
              }
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            {modalVisible === "signup" && (
              <TextInput
                placeholder="E-mail"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            )}
            <TextInput
              placeholder="Senha"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 12 }]}
              onPress={modalVisible === "login" ? handleLogin : handleSignup}
            >
              <Text style={styles.buttonText}>
                {modalVisible === "login" ? "Entrar" : "Criar Conta"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(null)}
              style={{ marginTop: 8 }}
            >
              <Text style={{ color: "#ccc", textAlign: "center" }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0c0c0c",
    minHeight: "100%",
  },
  tituloContainer: {
    backgroundColor: "#1e1e1e",
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    marginTop: 24,
    zIndex: 2,
  },
  titulinho: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  logo: {
    width: 300,
    height: 120,
    marginBottom: 12,
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
  },
  buttonsWrapper: {
    marginTop: 40,
    width: "80%",
  },
  button: {
    backgroundColor: "rgba(48,48,48,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pokemonBg: {
    position: "absolute",
    opacity: 0.9,
    zIndex: 0,
  },
  pikachuBg: { top: "80%", left: "10%", width: 150, height: 150 },
  charmanderBg: { top: "85%", left: "40%", width: 180, height: 180 },
  squirtleBg: { top: "85%", left: "65%", width: 170, height: 170 },
  pokedexBg: { top: "55%", left: "60%", width: 400, height: 400 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 20,
    width: "85%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 6,
  },
});
