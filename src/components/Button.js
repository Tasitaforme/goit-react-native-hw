import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {text && <Text style={styles.btnTitle}>{text}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "ios" ? "#00bfff" : "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
