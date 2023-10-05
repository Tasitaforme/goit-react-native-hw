import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

//SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  //   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  //   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} />
      {/* <RegistrationScreen onLayout={onLayoutRootView} /> */}
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
