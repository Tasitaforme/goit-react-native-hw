import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";
import Link from "../../components/Link";
import TitleMain from "../../components/TitleMain";
import ValidationInput from "../../components/ValidationInput";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/authOperations";
import COLORS from "../../const/colors";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/config";

const initialState = {
  user: "",
  email: "",
  password: "",
  userPhoto: "",
};

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // function handleSubmit() {
  //   keyboardHide();
  //   validate();
  // }

  const validate = () => {
    let isValid = true;
    if (!state.user) {
      handleError("Please input login", "user");
      isValid = false;
    } else if (state.user.length < 2) {
      handleError("Min login length of 2", "user");
      isValid = false;
    }

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

    // if (isValid) {
    //   console.log(state);

    //   // dispatch(register(state));
    //   // setState(initialState);
    //   // setPhoto(null);
    //   // navigation.navigate("Home");
    // }
  };
  const handleOnchange = (text, input) => {
    setState((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  //!++++++++++++++++++++++++++++
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      // handleOnchange(result.assets[0].uri, "userPhoto");
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniqPostId = Date.now().toString();

      const imageRef = ref(storage, `userImage/${uniqPostId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleSubmit = async () => {
    keyboardHide();
    const userPhoto = photo ? await uploadPhotoToServer() : "";
    // console.log(userPhoto);
    state.userPhoto = userPhoto;
    validate();
    dispatch(register(state));
    // console.log("after validate", state);
    // console.log(state.user, state.email, state.password, userPhoto);
    // dispatch(register(state.user, state.email, state.password, userPhoto));
    setState(initialState);
    setPhoto(null);
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
            <View style={styles.wrapperPhoto}>
              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    borderRadius: 16,
                  }}
                />
              )}

              {!photo && (
                <TouchableOpacity
                  style={styles.btnAddPhoto}
                  activeOpacity={0.8}
                  onPress={pickPhoto}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={COLORS.accent}
                  />
                </TouchableOpacity>
              )}
              {photo && (
                <TouchableOpacity
                  style={styles.btnAddPhoto}
                  activeOpacity={0.8}
                  onPress={() => setPhoto(null)}
                >
                  <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              )}
            </View>

            <TitleMain text={"Реєстрація"} marginTop={60} />

            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  marginBottom: isShowKeyboard
                    ? Platform.OS === "ios"
                      ? 156
                      : 128
                    : 16,
                }}
              >
                <ValidationInput
                  name={"user"}
                  placeholder="Логін"
                  value={state.user}
                  onFocusFunc={setIsShowKeyboard}
                  onChangeText={(text) => handleOnchange(text, "user")}
                  onFocus={() => handleError(null, "user")}
                  error={errors.user}
                  onSubmitEditing={() => keyboardHide()}
                />

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

              <Button text="Зареєстуватися" onPress={() => handleSubmit()} />
            </View>
            <Link
              text={"Вже є акаунт? "}
              underlineText={"Увійти"}
              onPress={() => navigation.navigate("Login")}
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
