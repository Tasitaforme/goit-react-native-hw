import {
  StyleSheet,
  View,
  ImageBackground,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import Button from "../../components/Button";
import Link from "../../components/Link";
import ValidationInput from "../../components/ValidationInput";
import TitleMain from "../../components/TitleMain";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  function handleSubmit() {
    keyboardHide();
    validate();
  }
  const validate = () => {
    let isValid = true;

    if (!state.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (
      !state.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
      )
    ) {
      handleError(
        "Please input a valid email. The email address must contain the @ symbol and text after it. For example: email@mail.com",
        "email"
      );
      isValid = false;
    }

    if (!state.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (state.password.length < 6) {
      handleError("Min password length of 6", "password");
      isValid = false;
    }

    if (isValid) {
      dispatch(login(state));
      setState(initialState);
      // navigation.navigate("Home");
    }
  };
  const handleOnchange = (text, input) => {
    setState((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/bg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.wrapper}>
            <TitleMain text={"Увійти"} />

            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  marginBottom: isShowKeyboard
                    ? Platform.OS === "ios"
                      ? 58
                      : 128
                    : 16,
                }}
              >
                <ValidationInput
                  name={"email"}
                  placeholder="Адреса електронної пошти"
                  value={state.email}
                  onFocusFunc={setIsShowKeyboard}
                  onChangeText={(text) => handleOnchange(text, "email")}
                  onFocus={() => handleError(null, "email")}
                  error={errors.email}
                  onSubmitEditing={() => keyboardHide()}
                />
                <View>
                  <ValidationInput
                    name={"password"}
                    placeholder="Пароль"
                    value={state.password}
                    onFocusFunc={setIsShowKeyboard}
                    onChangeText={(text) => handleOnchange(text, "password")}
                    onFocus={() => handleError(null, "password")}
                    error={errors.password}
                    onSubmitEditing={() => keyboardHide()}
                    secureTextEntry={!showPassword}
                  />
                  <Link
                    text={!showPassword ? "Показати" : "Приховати"}
                    onPress={toggleShowPassword}
                    position={"absolute"}
                    bottom={32}
                    right={16}
                  />
                </View>
              </KeyboardAvoidingView>

              <Button text="Увійти" onPress={() => handleSubmit()} />
            </View>
            <Link
              text={"Немає акаунту? "}
              underlineText={"Зареєстуватися"}
              onPress={() => navigation.navigate("Registration")}
              marginBottom={Platform.OS === "ios" ? 128 : 0}
            />
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
    paddingTop: 32,
    paddingBottom: 60,
    paddingHorizontal: 16,
    textAlign: "center",
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
  form: {
    marginTop: 32,
    marginBottom: 16,
    width: "100%",
  },
});
