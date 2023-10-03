import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <StatusBar style="auto" barStyle={"dark-content"} />
        <View style={{ height: "70%" }}>
          <View style={styles.wrapper} textAlign={"center"}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput style={styles.input} placeholder="Логін" />
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            />
            <TextInput
              style={styles.input}
              placeholder="Пароль"
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff" }}>Зареєстуватися</Text>
            </TouchableOpacity>
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
    // alignItems: "center",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    //textAlign: "center",
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
    //textAlign: "center",
    fontSize: 30,
    fontWeight: "500",
    letterSpacing: 0.3,
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
  },
  button: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginVertical: 16,
  },
});

// style={{ height: "70%" }}
