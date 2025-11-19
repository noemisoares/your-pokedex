import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { Link, router } from "expo-router";
import { useUserStore } from "../app/store/useUserStore";
import { createUser, loginUser } from "../app/api/backend";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;

const Sidebar: React.FC<Props> = ({ visible, onClose }) => {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const logout = useUserStore((s) => s.logout);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [email, setEmail] = useState("");

  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : SCREEN_WIDTH,
      duration: 280,
      easing: undefined,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  function navigateAndClose(path: string) {
    router.push(path as any);
    onClose();
  }

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
      Alert.alert("Conta criada!", "Você já pode fazer login.");
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
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#bbb" />
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
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigateAndClose("/")}
            >
              <Ionicons name="home" size={22} color="#e74c3c" />
              <Text style={styles.link}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigateAndClose("/sobre/page")}
            >
              <Ionicons name="information-circle" size={22} color="#e74c3c" />
              <Text style={styles.link}>Sobre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigateAndClose("/pokedex/page")}
            >
              <Ionicons name="book" size={22} color="#e74c3c" />
              <Text style={styles.link}>Pokedex</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => navigateAndClose("/perfil/page")}
            >
              <Ionicons name="person" size={22} color="#e74c3c" />
              <Text style={styles.link}>Perfil</Text>
            </TouchableOpacity>
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
                  <TouchableOpacity
                    onPress={() => setMode("login")}
                    style={[styles.modeButton, mode === "login" && styles.modeActive]}
                  >
                    <Text style={styles.modeText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setMode("signup")}
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
                  <Text style={styles.loginButtonText}>
                    {mode === "login" ? "Entrar" : "Criar Conta"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerLinkItem}
              onPress={() => navigateAndClose("/devs/page")}
            >
              <Ionicons name="people" size={20} color="#e74c3c" />
              <Text style={styles.footerLink}>Conheça os Desenvolvedores</Text>
            </TouchableOpacity>

            {user && !user.anonymous && (
              <Text style={styles.small}>Logado como {user.trainerName}</Text>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  container: {
    height: "100%",
    width: 300,
    backgroundColor: "#111",
    padding: 16,
    paddingTop: 36,
    borderLeftWidth: 1,
    borderLeftColor: "#333",
    position: "absolute",
    right: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userArea: { marginBottom: 12 },
  trainerName: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  username: { color: "#aaa", marginTop: 4 },
  links: { marginTop: 8, gap: 6 },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  link: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  divider: { height: 1, backgroundColor: "#222", marginVertical: 12 },
  authArea: { flex: 1 },
  authToggle: { flexDirection: "row", marginBottom: 8 },
  modeButton: { flex: 1, padding: 8, alignItems: "center" },
  modeActive: { backgroundColor: "#222", borderRadius: 8 },
  modeText: { color: "#fff" },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  loginButtonText: { color: "#fff", fontWeight: "bold" },
  logoutButton: {
    backgroundColor: "#e74c3c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingTop: 10,
  },
  footerLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  footerLink: {
    color: "#fff",
    fontSize: 16,
  },
  small: { color: "#aaa", fontSize: 12 },
});