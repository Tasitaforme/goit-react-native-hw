import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    //700
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    //500
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    //400
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      console.log("Шрифти завантажені");
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Шрифти не завантажені");
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <StatusBar style="auto" barStyle={"dark-content"} /> */}
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
