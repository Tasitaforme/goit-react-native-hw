import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./src/screens/authScreens/LoginScreen";
import RegistrationScreen from "./src/screens/authScreens/RegistrationScreen";
import Home from "./src/screens/mainScreens/Home";

import CommentsScreen from "./src/screens/nestedScreens/CommentsScreen";
import MapScreen from "./src/screens/nestedScreens/MapScreen";

//SplashScreen.preventAutoHideAsync();
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </Stack.Group>

          <Stack.Group
            screenOptions={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  style={{ paddingLeft: 16, opacity: 0.6 }}
                  activeOpacity={1}
                  onPress={navigation.goBack}
                >
                  <Ionicons name="arrow-back" size={24} color="#212121" />
                </TouchableOpacity>
              ),
              headerTitleStyle: {
                color: "#212121",
                fontFamily: "Roboto-Medium",
                fontWeight: "500",
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.4,
              },
              headerTitleAlign: "center",
              headerStyle: {
                height: Platform.OS === "ios" ? 88 : 60,
                borderColor: "#E8E8E8",
                borderBottomWidth: 1,
              },
            })}
          >
            <Stack.Screen
              name="Comments"
              component={CommentsScreen}
              options={{ title: "Коментарі" }}
            />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{ title: "Мапа" }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
