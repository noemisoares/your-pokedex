import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../constants/theme";

export const Header: React.FC = () => {
  const systemScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemScheme === "dark");
  const theme = useTheme();

  const styles = getStyles(theme);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    // Futuramente pode atualizar um Context para tema global
  };

  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        {/* Logo */}
        <Link href="/">
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Link>

        {/* Links */}
        <View style={styles.navList}>
          <Link href="/">
            <Text style={styles.navText}>Home</Text>
          </Link>

          <TouchableOpacity>
            <Text style={styles.navText}>Sobre Nós</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.navText}>Como Funciona</Text>
          </TouchableOpacity>

          <Link href="/pokedex/page">
            <Text style={styles.navText}>Pokedex</Text>
          </Link>
        </View>

        {/* Botão de tema */}
        <TouchableOpacity
          onPress={toggleTheme}
          style={styles.themeButton}
          accessibilityLabel="Alternar tema claro/escuro"
        >
          <Image
            source={
              darkMode
                ? require("../assets/icons/ultra_ball.png")
                : require("../assets/icons/great_ball.png")
            }
            style={styles.themeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.primary,
      borderBottomWidth: 1,
      borderBottomColor: theme.text,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      width: 100,
      height: 50,
    },
    navList: {
      flexDirection: "row",
      alignItems: "center",
    },
    navText: {
      color: "#e0e0e0",
      fontWeight: "bold",
      fontSize: 16,
      marginRight: 24, // substitui o gap
    },
    themeButton: {
      backgroundColor: "transparent",
      padding: 8,
    },
    themeIcon: {
      width: 26,
      height: 26,
    },
  });
