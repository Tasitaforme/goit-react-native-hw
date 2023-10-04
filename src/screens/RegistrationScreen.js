import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function RegistrationScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ height: "65%" }}>
          <View style={styles.wrapper} textAlign={"center"}>
            <View style={styles.containerPhoto}>
              <TouchableOpacity style={styles.btnAddPhoto} activeOpacity={0.8}>
                <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Реєстрація</Text>

            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TextInput style={styles.input} placeholder="Логін" />
                <TextInput
                  style={styles.input}
                  placeholder="Адреса електронної пошти"
                />

                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    secureTextEntry={true}
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
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.btnTitle}>Зареєстуватися</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.link}>Вже є акаунт? Увійти</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "",
    // alignItems: "center",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    alignItems: "center",
  },
  containerPhoto: {
    width: 120,
    height: 120,
    flexShrink: 0,
    backgroundColor: "#E8E8E8",
    position: "absolute",
    top: -60,
    borderRadius: 16,
  },
  btnAddPhoto: {
    // width: 24,
    // height: 24,
    position: "absolute",
    bottom: 12,
    right: -12,
    // borderRadius: 100,
    // borderWidth: 1,
    // borderColor: "#FF6C00",
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    color: "#212121",
    //textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  form: {
    paddingHorizontal: 16,
    width: "100%",
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
