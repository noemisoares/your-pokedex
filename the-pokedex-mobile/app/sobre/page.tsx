import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AboutPage() {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir link", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>O Projeto</Text>
        <Text style={styles.cardText}>
          Esta aplicação foi desenvolvida como um projeto educacional para
          auxiliar treinadores Pokémon em suas jornadas. Aqui podes consultar a
          Pokédex, criar equipas estratégicas e conhecer os detalhes de cada
          criatura.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologias Utilizadas</Text>

        <View style={styles.techItem}>
          <Ionicons name="logo-react" size={20} color="#61DAFB" />
          <Text style={styles.techText}>React Native & Expo</Text>
        </View>

        <View style={styles.techItem}>
          <Ionicons name="cloud-download-outline" size={20} color="#ff3b3b" />
          <Text style={styles.techText}>PokeAPI (Dados)</Text>
        </View>

        <View style={styles.techItem}>
          <Ionicons name="code-slash" size={20} color="#4db152" />
          <Text style={styles.techText}>TypeScript</Text>
        </View>

        <View style={styles.techItem}>
          <Ionicons name="layers-outline" size={20} color="#fffc3bff" />
          <Text style={styles.techText}>Zustand (Gerenciamento)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Aviso Legal</Text>
        <Text style={styles.disclaimerText}>
          Pokémon e os nomes dos personagens são marcas comerciais da Nintendo.
          Não há intenção de infringir direitos de autor. Projeto sem fins
          lucrativos.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.devButton}
        onPress={() => router.push("/devs/page")}
      >
        <Ionicons
          name="people"
          size={24}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.devButtonText}>Conheça os Desenvolvedores</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0c0c0c",
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 10,
  },
  version: {
    color: "#666",
    fontSize: 14,
  },
  card: {
    backgroundColor: "#101015",
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderColor: "#3a3a3d",
    borderWidth: 1,
    // Sombra sutil
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    color: "#ff3b3b",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 8,
  },
  cardText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
  },
  techItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 4,
  },
  techText: {
    color: "#eee",
    fontSize: 16,
    marginLeft: 12,
  },
  disclaimerText: {
    color: "#888",
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 20,
  },
  devButton: {
    flexDirection: "row",
    backgroundColor: "#d12727",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ff5c5c",
  },
  devButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
