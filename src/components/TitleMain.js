import { StyleSheet, Text } from "react-native";
import React from "react";

export default function TitleMain({ text, ...addStyles }) {
  return <Text style={{ ...styles.title, ...addStyles }}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
