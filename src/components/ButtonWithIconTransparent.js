import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function ButtonWithIconTransparent({
  onPress,
  children,
  ...addStyles
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...addStyles }}
      activeOpacity={1}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    opacity: 0.6,
    flexShrink: 0,
  },
});
