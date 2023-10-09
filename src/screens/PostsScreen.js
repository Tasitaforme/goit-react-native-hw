import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
export default function PostsScreen() {
  return (
    <>
      <StatusBar
        translucent={false}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 32,
            paddingHorizontal: 16,
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              flexShrink: 0,
            }}
            source={require("../../assets/images/logophoto.jpg")}
            resizeMode="cover"
          />
          <View style={{ flexDirection: "column", gap: 2 }}>
            <Text
              style={{
                color: "#212121",
                fontFamily: "Roboto-Bold",
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 14,
              }}
            >
              Natali Romanova
            </Text>
            <Text
              style={{
                color: "rgba(33, 33, 33, 0.80)",
                fontFamily: "Roboto-Regular",
                fontWeight: "400",
                fontSize: 12,
                lineHeight: 12,
              }}
            >
              email@example.com
            </Text>
          </View>
        </View>

        <View flexGrow={1}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
