import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Title({ text, ...addStyles }) {
  return <Text style={{ ...styles.title, ...addStyles }}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    textAlign: "center",
  },
});
