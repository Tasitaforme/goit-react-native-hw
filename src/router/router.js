import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/stack";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegistrationScreen from "../screens/authScreens/RegistrationScreen";
import Home from "../screens/mainScreens/Home";
import CommentsScreen from "../screens/nestedScreens/CommentsScreen";
import MapScreen from "../screens/nestedScreens/MapScreen";

const Stack = createStackNavigator();

export const useRouter = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{ paddingLeft: 16, opacity: 0.6 }}
            activeOpacity={1}
            onPress={() => navigation.goBack(null)}
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
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

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
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
