import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Link({ text, onPress, ...addStyles }) {
  return (
    <Text style={{ ...styles.link, ...addStyles }} onPress={onPress}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "#1B4371",
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 16,
  },
});
