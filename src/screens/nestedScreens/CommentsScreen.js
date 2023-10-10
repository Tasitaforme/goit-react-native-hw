import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../const/colors";
import { AntDesign } from "@expo/vector-icons";
import ButtonWithIcon from "../../components/ButtonWithIcon";

const initialState = {
  comment: "",
  userIcon: "",
  dataTime: "",
};

export default function CommentsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const handleOnchange = (text, input) => {
    setState((prevState) => ({ ...prevState, [input]: text }));
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  function handleSubmit() {
    keyboardHide();
    console.log(state);
    setState(initialState);
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <Image
            style={{
              height: 240,
              width: "100%",
              borderRadius: 16,
            }}
            source={require("../../../assets/images/bg.jpg")}
            resizeMode="cover"
          />

          <View
            style={{
              flexDirection: "column",
              gap: 24,
              marginTop: 32,
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  marginRight: 16,
                  marginTop: 16,
                }}
                source={require("../../../assets/images/logophoto.jpg")}
                resizeMode="cover"
              />
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  borderRadius: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
              >
                <Text style={styles.text}>
                  Really love your most recent photo. I’ve been trying to
                  capture the same thing for a few months and would love some
                  tips!
                </Text>
                <Text style={styles.subText}>09 червня, 2020 | 08:40</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  marginRight: 16,
                  marginTop: 16,
                }}
                source={require("../../../assets/images/logophoto.jpg")}
                resizeMode="cover"
              />
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  borderRadius: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={styles.text}
                  android_hyphenationFrequency={"normal"}
                >
                  A fast 50mm like f1.8 would help with the bokeh. I’ve been
                  using primes as they tend to get a bit sharper images.
                </Text>
                <Text style={styles.subText}>09 червня, 2020 | 08:40</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            marginBottom: isShowKeyboard
              ? Platform.OS === "ios"
                ? 300
                : 38
              : 0,
          }}
        >
          <View style={{ marginTop: 16 }}>
            <TextInput
              style={{
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
                fontSize: 16,
                lineHeight: 18,
                borderRadius: 50,
                borderColor: "#E8E8E8",
                backgroundColor: "#F6F6F6",
                paddingVertical: 16,
                paddingLeft: 16,
                height: 50,
              }}
              name={"comment"}
              placeholder="Коментувати..."
              value={state.comment}
              onFocus={() => setIsShowKeyboard(true)}
              onSubmitEditing={() => keyboardHide()}
              onChangeText={(text) => handleOnchange(text, "comment")}
            />
            <TouchableOpacity
              style={{
                padding: 8,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                flexShrink: 0,
                width: 40,
                height: 40,
                position: "absolute",
                top: 4,
                right: 8,
                backgroundColor: COLORS.accent,
              }}
              activeOpacity={0.9}
              onPress={() => handleSubmit()}
            >
              <AntDesign name="arrowup" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#212121",
    width: "40%",
  },
  subText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 4,
    // alignSelf: "flex-end",
  },
});
