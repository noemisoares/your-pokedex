// globalStyles.ts
// Estilos genéricos inspirados no seu globals.css

import { StyleSheet } from "react-native";
import { useTheme } from "./theme";

export const useGlobalStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      color: theme.text,
    },
    text: {
      fontFamily: "Inter",
      color: theme.text,
    },
    title: {
      fontFamily: "Inter",
      fontWeight: "bold",
      color: theme.title,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    button: {
      backgroundColor: theme.button,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
};
