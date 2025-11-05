import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Header } from "../components/Header";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});