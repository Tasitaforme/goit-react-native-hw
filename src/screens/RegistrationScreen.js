import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const initialState = {
  user: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  //console.log(isShowKeyboard);
  function handleSubmit() {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.wrapper} textAlign={"center"}>
            <View style={styles.wrapperPhoto}>
              <TouchableOpacity style={styles.btnAddPhoto} activeOpacity={0.8}>
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={
                  {
                    //marginBottom: isShowKeyboard ? 250 : 0,
                  }
                }
              >
                <View style={styles.formInputs}>
                  <TextInput
                    style={styles.input}
                    placeholder="Логін"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.user}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, user: value }))
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Адреса електронної пошти"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={state.email}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />

                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Пароль"
                      secureTextEntry={true}
                      onFocus={() => setIsShowKeyboard(true)}
                      value={state.password}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <Text
                      style={styles.link}
                      position={"absolute"}
                      top={16}
                      right={16}
                    >
                      Показати
                    </Text>
                  </View>
                </View>
              </KeyboardAvoidingView>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.btnTitle}>Зареєстуватися</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    //justifyContent: "flex-end",
    //alignContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    paddingBottom: 68,
  },
  wrapperPhoto: {
    width: 120,
    height: 120,
    flexShrink: 0,
    backgroundColor: "#E8E8E8",
    position: "absolute",
    top: -60,
    borderRadius: 16,
  },
  btnAddPhoto: {
    position: "absolute",
    bottom: 12,
    right: -12,
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    color: "#212121",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  form: {
    paddingHorizontal: 16,
    width: "100%",
  },
  formInputs: {
    //flex: 1,
    // justifyContent: "flex-end",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 4,
    height: 50,
    flexShrink: 0,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  link: {
    color: "#1B4371",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "ios" ? "#00bfff" : "#FF6C00",
    borderRadius: 100,
    marginVertical: 16,
  },
  btnTitle: {
    color: "#fff",
    fontSize: 16,
  },
});
