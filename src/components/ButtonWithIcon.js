import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function ButtonWithIcon({
  onPress,
  width,
  children,
  ...addStyles
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, width, ...addStyles }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "ios" ? "#00bfff" : "#FF6C00",
    borderRadius: 100,
    flexShrink: 0,
  },
});
