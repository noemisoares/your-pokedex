import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Pokeball from "../components/Pokeball";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Pokeball size={120} />
        <Text style={styles.loadingTitle}>Seja Bem-Vindo Treinador!</Text>
      </View>
    );
  }

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

      {/* Imagens de fundo */}
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
        <TouchableOpacity
          style={[styles.button, { paddingVertical: 18 }]}
          onPress={() => router.push("/pokedex/page")}
        >
          <Text style={[styles.buttonText, { fontSize: 20 }]}>POKEDEX</Text>
        </TouchableOpacity>
      </View>
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
  titulinho: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  logo: { width: 300, height: 120, marginBottom: 12 },
  subtitle: { color: "#ccc", fontSize: 16 },
  buttonsWrapper: { marginTop: 40, width: "80%" },
  button: {
    backgroundColor: "rgba(48,48,48,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold", textAlign: "center" },
  pokemonBg: { position: "absolute", opacity: 0.9, zIndex: 0 },
  pikachuBg: { top: "80%", left: "10%", width: 150, height: 150 },
  charmanderBg: { top: "85%", left: "40%", width: 180, height: 180 },
  squirtleBg: { top: "85%", left: "65%", width: 170, height: 170 },
  pokedexBg: { top: "55%", left: "60%", width: 400, height: 400 },
  loadingContainer: { flex: 1, backgroundColor: "#0c0c0c", justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  loadingTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: 28,
  },
});