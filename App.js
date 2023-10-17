import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./src/screens/authScreens/LoginScreen";
import RegistrationScreen from "./src/screens/authScreens/RegistrationScreen";
import Home from "./src/screens/mainScreens/Home";

import CommentsScreen from "./src/screens/nestedScreens/CommentsScreen";
import MapScreen from "./src/screens/nestedScreens/MapScreen";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main/Main";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

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
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
      </View>
    </Provider>
  );
}
