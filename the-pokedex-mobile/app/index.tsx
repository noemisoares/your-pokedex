import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView,Animated } from "react-native";
import { useRouter } from "expo-router";
import Pokeball from "../components/Pokeball";



export default function Home() {
  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(blinkAnim, {
        toValue: 0.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(blinkAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);
useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(floatAnim, {
        toValue: -20,   
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(floatAnim, {
        toValue: 0,     
        duration: 1500,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);
useEffect(() => {
  Animated.loop(
    Animated.timing(bgAnim, {
      toValue: -500,     
      duration: 24000,
      useNativeDriver: true,
    })
  ).start();
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
      {/* Fundo infinito */}
<View style={styles.bgWrapper}>
  <Animated.Image
    source={require("../assets/images/bgpoke.png")}
    style={[
      styles.bgPoke,
      { transform: [{ translateX: bgAnim }] }
    ]}
  />

  <Animated.Image
    source={require("../assets/images/bgpoke.png")}
    style={[
      styles.bgPoke,
      {
        left: 1080, 
        position: "absolute",
        transform: [{ translateX: bgAnim }]
      }
    ]}
  />
</View>

      <View style={styles.tituloContainer}>
        
        
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
  <Image
    source={require("../assets/logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />
</Animated.View>
        
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

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={[styles.button, { paddingVertical: 25 }]}
          onPress={() => router.push("/pokedex/page")}
        >
          <Animated.Text style={[styles.buttonText, { fontSize: 20, opacity: blinkAnim }]}>
          Toque para começar
          </Animated.Text>
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
    backgroundColor: "rgba(30, 30, 30, 0)",
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "flex-start",
    marginTop: 0,
    marginBottom: 150,
    zIndex: 2,
  },
  titulinho: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  logo: { width: 330, height: 150, marginBottom: 12 },
  subtitle: { color: "#ccc", fontSize: 16 },
  buttonsWrapper: { marginTop: 40, width: "80%" },
  button: {
    backgroundColor: "rgba(48,48,48,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 6,
    marginBottom: 70,
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold", textAlign: "center" },
  pokemonBg: { position: "absolute", opacity: 0.9, zIndex: 0 },
  pikachuBg: { top: "82%", left: "04%", width: 150, height: 150 },
  charmanderBg: { top: "82%", left: "36%", width: 180, height: 180 },
  squirtleBg: { top: "83%", left: "60%", width: 170, height: 170 },
  pokedexBg: { top: "50%", left: "60%", width: 400, height: 400 },
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
  bgWrapper: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 0,
},

bgPoke: {
  position: "absolute",
  width: 1080,  
  height: "100%",
  opacity: 0.07,
},
});