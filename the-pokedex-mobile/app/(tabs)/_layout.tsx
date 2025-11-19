import React from "react";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#111" },
        tabBarActiveTintColor: "#4db152",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tabs.Screen name="pokedex" options={{ title: "Pokedex" }} />
      <Tabs.Screen name="team-builder" options={{ title: "Team Builder" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
