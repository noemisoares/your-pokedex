// theme.ts
// Equivalente do globals.css no React Native + Expo

export const lightTheme = {
  primary: "#0a2b4a",
  secondary: "#fcfcfc",
  bg: "#dddddd",
  text: "#161616",
  button: "#145bcd",
  card: "#f9f9f9",
  title: "#333333",
};

export const darkTheme = {
  primary: "#161616",
  secondary: "#1d1d1d",
  bg: "#3b0606",
  text: "#e0e0e0",
  button: "#9d0505",
  card: "#161616",
  title: "#dad9d9",
};

// Tipo de tema
export type ThemeType = typeof lightTheme;

// Hook simples para trocar o tema (pode ser aprimorado com Context futuramente)
import { useColorScheme } from "react-native";

export const useTheme = (): ThemeType => {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkTheme : lightTheme;
};
