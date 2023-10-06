import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

export default function Input({
  name,
  placeholder,
  value,
  onChangeText,
  onFocusFunc,
  ...propsAdd
}) {
  const [isFocused, setIsFocused] = useState({
    user: false,
    email: false,
    password: false,
  });

  const handleInputFocus = (name) => {
    setIsFocused({
      [name]: true,
    });
  };
  const handleInputBlur = (name) => {
    setIsFocused({
      [name]: false,
    });
  };

  return (
    <TextInput
      style={
        isFocused[{ name }]
          ? [styles.input, { borderColor: "#FF6C00" }]
          : styles.input
      }
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => {
        {
          handleInputFocus({ name });
          onFocusFunc(true);
        }
      }}
      onBlur={() => handleInputBlur({ name })}
      {...propsAdd}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    flexShrink: 0,
    padding: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 16,
  },
});
