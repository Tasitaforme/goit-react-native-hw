import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ text, onPress, disabled, ...addStyles }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: disabled
          ? "#F6F6F6"
          : Platform.OS === "ios"
          ? "#00bfff"
          : "#FF6C00",
        ...addStyles,
      }}
      activeOpacity={0.9}
      onPress={onPress}
    >
      {text && (
        <Text
          style={{ ...styles.btnTitle, color: disabled ? "#BDBDBD" : "#fff" }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});
