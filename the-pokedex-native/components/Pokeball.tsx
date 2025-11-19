import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function Pokeball({ size = 100 }: { size?: number }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const border = Math.max(3, size * 0.06);
  const buttonSize = size * 0.32;
  const centerLine = Math.max(6, size * 0.12);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ rotate: spin }],
          width: size,
          height: size,
        },
      ]}
    >
      <View
        style={[
          styles.pokeball,
          {
            width: size,
            height: size,
            borderWidth: border,
            borderRadius: size / 2,
          },
        ]}
      >
        <View style={[styles.topHalf, { height: (size - centerLine) / 2 }]} />
        <View style={[styles.centerLine, { height: centerLine }]} />
        <View
          style={[styles.bottomHalf, { height: (size - centerLine) / 2 }]}
        />

        <View
          style={[
            styles.centerButton,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              borderWidth: border,
              top: (size - buttonSize) / 2,
              left: (size - buttonSize) / 2,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pokeball: {
    borderColor: "#000",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#000",
  },
  topHalf: {
    backgroundColor: "#FF0000",
    width: "100%",
  },
  centerLine: {
    backgroundColor: "#000",
    width: "100%",
  },
  bottomHalf: {
    backgroundColor: "#FFF",
    width: "100%",
  },
  centerButton: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  innerButton: {
    position: "absolute",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
  },
});
