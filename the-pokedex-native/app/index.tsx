import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";

export default function Home() {
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
      {/* Caso queira SVG, usar react-native-svg */}
      {/* <PokedexSvg style={[styles.pokemonBg, styles.pokedexBg]} /> */}

      <View style={styles.pokedexLinkWrapper}>
        <Link href="/pokedex/page" asChild>
          <TouchableOpacity style={styles.pokedexLinkRight}>
            <Text style={styles.pokedexLinkText}>Ir para Pokédex</Text>
          </TouchableOpacity>
        </Link>
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
  pokedexLinkWrapper: {
    marginTop: 40,
    zIndex: 3,
  },
  pokedexLinkRight: {
    backgroundColor: "rgba(48,48,48,0.6)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  pokedexLinkText: {
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
});
