import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Link({ text, underlineText, onPress, ...addStyles }) {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={{ ...styles.link, ...addStyles }} onPress={onPress}>
        {text}
      </Text>
      {underlineText && (
        <Text style={{ ...styles.link, textDecorationLine: "underline" }}>
          {underlineText}
        </Text>
      )}
    </TouchableOpacity>
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
