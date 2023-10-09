import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import Home from "./src/screens/Home";
import CommentsScreen from "./src/screens/CommentsScreen";

//SplashScreen.preventAutoHideAsync();
const AuthStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          // options={{ headerShown: false }}
        />
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="Comments" component={CommentsScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Коментарі" }}
      />
    </AuthStack.Navigator>
  );
};

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

  const routing = useRoute(false);
  return (
    <NavigationContainer>{routing}</NavigationContainer>

    //  <View style={styles.container} onLayout={onLayoutRootView}>
    //   <StatusBar style="auto" barStyle={"dark-content"} />
    //   <RegistrationScreen />
    //   <LoginScreen />
    //   <PostsScreen />
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
