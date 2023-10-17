import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
} from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authOperations";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Tab.Navigator
        initialRouteName="Posts"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: Platform.OS === "ios" ? 88 : 60,
          },
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
        }}
      >
        <Tab.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Публікації",

            headerRight: () => (
              <TouchableOpacity
                style={{ paddingRight: 16, opacity: 0.6 }}
                activeOpacity={1}
                onPress={() => dispatch(logout())}
              >
                <Feather name="log-out" size={24} color="#212121" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="appstore-o"
                size={24}
                color={focused ? "#212121" : "rgba(33, 33, 33, 0.60)"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreatePost"
          component={CreatePostsScreen}
          options={{
            title: "Створити публікацію",
            tabBarIcon: ({ focused, color, size }) => (
              <View style={styles.button}>
                <Ionicons name="add" size={24} color="#fff" />
              </View>
            ),
            tabBarStyle: { display: "none" },
            headerBackVisible: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingLeft: 16, opacity: 0.6 }}
                activeOpacity={1}
                // onPress={() => navigation.navigate("Posts")}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#212121" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="user"
                size={24}
                color={focused ? "#212121" : "rgba(33, 33, 33, 0.60)"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "ios" ? "#00bfff" : "#FF6C00",
    borderRadius: 100,
    flexShrink: 0,
    width: 72,
  },
});
