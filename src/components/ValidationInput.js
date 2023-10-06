import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function ValidationInput({
  name,
  placeholder,
  value,
  error,
  onFocus = () => {},
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
    <View>
      {error && <Text style={styles.msg}>{error}</Text>}
      <TextInput
        style={
          isFocused[{ name }]
            ? [styles.input, { borderColor: "#FF6C00" }]
            : styles.input
        }
        placeholder={placeholder}
        value={value}
        onFocus={() => {
          {
            handleInputFocus({ name });
            onFocus();
            onFocusFunc(true);
          }
        }}
        onBlur={() => handleInputBlur({ name })}
        {...propsAdd}
      />
    </View>
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
  msg: {
    color: "red",
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    //marginTop: 7,
  },
});
