import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../constants/theme";
import Sidebar from "./Sidebar";

export const Header: React.FC = () => {
  const systemScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemScheme === "dark");
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const styles = getStyles(theme);

  const HamburgerIcon = () => (
    <View style={styles.hamburgerContent}>
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
      <View style={styles.hamburgerLine} />
    </View>
  );

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <View style={styles.header}>
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <View style={styles.nav}>
        <Link href="/">
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Link>

        <TouchableOpacity onPress={() => setSidebarOpen(true)} style={styles.hamburger}>
          <HamburgerIcon />
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
      paddingVertical: 10,
      paddingTop: 36,
      paddingHorizontal: 20,
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
    hamburger: {
      padding: 8,
      marginRight: 8,
    },
    hamburgerContent: {
      width: 24,
      height: 24,
      justifyContent: 'space-around',
    },
    hamburgerLine: {
      width: 24,
      height: 2,
      backgroundColor: '#e0e0e0',
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