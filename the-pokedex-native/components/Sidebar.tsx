import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { useUserStore } from "../app/store/useUserStore";
import { createUser, loginUser } from "../app/api/backend";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<Props> = ({ visible, onClose }) => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const logout = useUserStore((s) => s.logout);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await loginUser(username, password);
      setUser(userData);
      Alert.alert("Bem-vindo!", `Olá ${userData.trainerName}`);
      onClose();
    } catch (err: any) {
      Alert.alert("Erro no login", err.message || String(err));
    }
  };

  const handleSignup = async () => {
    try {
      await createUser(username, trainerName, email, password);
      Alert.alert("Conta criada!", "Você pode logar agora.");
      setMode("login");
    } catch (err: any) {
      Alert.alert("Erro", err.message || String(err));
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>Fechar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userArea}>
            {user && !user.anonymous ? (
              <>
                <Text style={styles.trainerName}>{user.trainerName}</Text>
                <Text style={styles.username}>{user.username}</Text>
              </>
            ) : (
              <>
                <Text style={styles.trainerName}>Treinador Anônimo</Text>
                <Text style={styles.username}>@anônimo</Text>
              </>
            )}
          </View>

          <View style={styles.links}>
            <Link href="/pokedex/page">
              <Text style={styles.link}>Pokedex</Text>
            </Link>

            <Link href="/perfil/page">
              <Text style={styles.link}>Perfil</Text>
            </Link>
          </View>

          <View style={styles.divider} />

          <View style={styles.authArea}>
            {user && !user.anonymous ? (
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            ) : (
              <>
                <View style={styles.authToggle}>
                  <TouchableOpacity onPress={() => setMode("login")}
                    style={[styles.modeButton, mode === "login" && styles.modeActive]}
                  >
                    <Text style={styles.modeText}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setMode("signup")}
                    style={[styles.modeButton, mode === "signup" && styles.modeActive]}
                  >
                    <Text style={styles.modeText}>Criar Conta</Text>
                  </TouchableOpacity>
                </View>

                {mode === "signup" && (
                  <TextInput
                    placeholder="Nome do treinador"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={trainerName}
                    onChangeText={setTrainerName}
                  />
                )}

                <TextInput
                  placeholder="Username (@...)"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                />

                {mode === "signup" && (
                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                )}

                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#999"
                  secureTextEntry
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={mode === "login" ? handleLogin : handleSignup}
                >
                  <Text style={styles.loginButtonText}>{mode === "login" ? "Entrar" : "Criar Conta"}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {user && !user.anonymous && (
            <View style={styles.footer}>
              <Text style={styles.small}>Logado como {user.trainerName}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: "row" },
  container: {
    width: 300,
    backgroundColor: "#111",
    padding: 16,
    paddingTop: 36,
  },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  close: { color: "#ccc" },
  userArea: { marginBottom: 12 },
  trainerName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  username: { color: "#aaa", marginTop: 4 },
  links: { marginTop: 8 },
  link: { color: "#fff", fontSize: 16, paddingVertical: 8 },
  divider: { height: 1, backgroundColor: "#222", marginVertical: 12 },
  authArea: { flex: 1 },
  authToggle: { flexDirection: "row", marginBottom: 8 },
  modeButton: { flex: 1, padding: 8, alignItems: "center" },
  modeActive: { backgroundColor: "#222", borderRadius: 8 },
  modeText: { color: "#fff" },
  input: { backgroundColor: "#222", color: "#fff", borderRadius: 8, padding: 8, marginBottom: 8 },
  loginButton: { backgroundColor: "#4db152", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 6 },
  loginButtonText: { color: "#fff", fontWeight: "bold" },
  logoutButton: { backgroundColor: "#e74c3c", padding: 12, borderRadius: 8, alignItems: "center" },
  logoutText: { color: "#fff", fontWeight: "bold" },
  footer: { paddingVertical: 8 },
  small: { color: "#aaa", fontSize: 12 },
});
