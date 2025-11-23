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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { useUserStore } from "../app/store/useUserStore";
import { createUser, loginUser, getAllUsers } from "../app/api/backend";

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
  const [trainerName, setTrainerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : SCREEN_WIDTH,
      duration: 280,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  function navigateAndClose(path: string) {
    router.push(path as any);
    onClose();
  }

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha usuário e senha.");
      return;
    }

    if (!username.startsWith("@")) {
      Alert.alert("Erro", 'O usuário deve começar com "@".');
      return;
    }

    try {
      const userData = await loginUser(username, password);
      setUser(userData);

      Alert.alert("Bem-vindo!", `Olá ${userData.trainerName}`);

      setUsername("");
      setPassword("");
      onClose();
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Falha inesperada.");
    }
  };

  const handleSignup = async () => {
    if (!trainerName.trim() || !username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (!username.startsWith("@")) {
      Alert.alert("Erro", 'O usuário deve começar com "@".');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }

    try {
      const users = await getAllUsers();

      if (users.find((u: any) => u.username === username)) {
        Alert.alert("Erro", "Este username já está em uso.");
        return;
      }

      if (users.find((u: any) => u.email === email)) {
        Alert.alert("Erro", "Este e-mail já está cadastrado.");
        return;
      }

      await createUser(username, trainerName, email, password);

      Alert.alert("Conta criada!", "Agora faça login.");
      setMode("login");

      setTrainerName("");
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Não foi possível criar sua conta.");
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

        <Animated.View
          style={[styles.container, { transform: [{ translateX: slideAnim }] }]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
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
                <TouchableOpacity style={styles.linkItem} onPress={() => navigateAndClose("/")}>
                  <Ionicons name="home" size={22} color="#e74c3c" />
                  <Text style={styles.link}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => navigateAndClose("/sobre/page")}>
                  <Ionicons name="information-circle" size={22} color="#e74c3c" />
                  <Text style={styles.link}>Sobre</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => navigateAndClose("/pokedex/page")}>
                  <Ionicons name="book" size={22} color="#e74c3c" />
                  <Text style={styles.link}>Pokedex</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkItem} onPress={() => navigateAndClose("/perfil/page")}>
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
                      autoCapitalize="none"
                      value={username}
                      onChangeText={setUsername}
                    />

                    {mode === "signup" && (
                      <TextInput
                        placeholder="E-mail"
                        placeholderTextColor="#999"
                        style={styles.input}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                      />
                    )}

                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        value={password}
                        onChangeText={setPassword}
                      />

                      <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                        <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                          size={22}
                          color="#ccc"
                          style={{ paddingHorizontal: 6 }}
                        />
                      </TouchableOpacity>
                    </View>

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
            </ScrollView>
          </KeyboardAvoidingView>
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
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 300,
    backgroundColor: "#111",
    padding: 16,
    paddingTop: 36,
    borderLeftWidth: 1,
    borderLeftColor: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 6,
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
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingTop: 10,
    marginBottom: 36,
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