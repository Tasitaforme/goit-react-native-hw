import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import ButtonWithIcon from "../components/ButtonWithIcon";
import Button from "../components/Button";

const initialState = {
  name: "",
  location: "",
};

export default function CreatePostsScreen() {
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [state, setState] = useState(initialState);
  const handleOnchange = (text, input) => {
    setState((prevState) => ({ ...prevState, [input]: text }));
  };
  useEffect(() => {
    if (!state.name || !state.location) {
      setIsDisabledBtn(true);
    } else {
      setIsDisabledBtn(false);
    }
  }, [state.name, state.location]);

  function handleSubmit() {
    console.log("Підтвердити");
    console.log(state);
    setState(initialState);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 240,
          width: "100%",
          backgroundColor: "#E8E8E8",
          flexShrink: 0,
          borderWidth: 1,
          borderColor: "#E8E8E8",
          backgroundColor: "#F6F6F6",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonWithIcon
          backgroundColor={"#FFF"}
          width={60}
          height={60}
          onPress={() => console.log("Завантажте фото")}
        >
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </ButtonWithIcon>
      </View>
      <Text
        style={{
          paddingTop: 8,
          color: "#BDBDBD",
          fontFamily: "Roboto-Regular",
          fontWeight: "400",
          fontSize: 16,
          lineHeight: 16,
        }}
        onPress={() => console.log("Завантажте фото")}
      >
        Завантажте фото
      </Text>
      <View style={styles.form}>
        <TextInput
          style={{
            marginBottom: 16,
            paddingVertical: 12,
            color: "#212121",
            fontFamily: "Roboto-Regular",
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 16,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8",
          }}
          placeholder="Назва..."
          placeholderTextColor={"#BDBDBD"}
          value={state.name}
          onChangeText={(text) => handleOnchange(text, "name")}
        ></TextInput>
        <View>
          <TextInput
            style={{
              marginBottom: 32,
              paddingVertical: 12,
              paddingLeft: 28,
              color: "#212121",
              fontFamily: "Roboto-Regular",
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 16,
              borderBottomWidth: 1,
              borderColor: "#E8E8E8",
            }}
            placeholder="Місцевість..."
            placeholderTextColor={"#BDBDBD"}
            value={state.location}
            onChangeText={(text) => handleOnchange(text, "location")}
          ></TextInput>
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color="#BDBDBD"
            position={"absolute"}
            top={14}
            left={0}
          />
        </View>
        <Button
          disabled={isDisabledBtn}
          text="Опублікувати"
          onPress={() => handleSubmit()}
        />
      </View>
      <ButtonWithIcon
        disabled
        width={70}
        backgroundColor={"#F6F6F6"}
        onPress={() => console.log("Видалити")}
      >
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </ButtonWithIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  form: {
    marginTop: 32,
    marginBottom: 16,
    width: "100%",
    flexGrow: 1,
  },
});
