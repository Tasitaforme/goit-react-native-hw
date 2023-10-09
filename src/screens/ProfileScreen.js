import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import TitleMain from "../components/TitleMain";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.wrapperPhoto}>
            <Image
              style={{
                borderRadius: 16,
                flexShrink: 0,
              }}
              source={require("../../assets/images/logophoto.jpg")}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.btnAddPhoto}
              activeOpacity={0.8}
              onPress={() => console.log("Замінити фото")}
            >
              {/* <AntDesign name="pluscircleo" size={24} color="#FF6C00" /> */}
              <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <TitleMain text={"Natali Romanova"} marginTop={92} />
          <View style={{ marginBottom: 32 }}>
            <View style={styles.wrapperItem}>
              <Image
                style={{
                  height: 240,
                  borderRadius: 16,
                  flexShrink: 0,
                }}
                source={require("../../assets/images/bg.jpg")}
                resizeMode="cover"
              />
              <Text>Ліс</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", gap: 24 }}>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <FontAwesome name="comment" size={24} color="#BDBDBD" />
                    <Text>8</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <AntDesign name="like2" size={24} color="#BDBDBD" />
                    <Text>150</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text>Ukraine</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    marginTop: 120,
    paddingBottom: 40,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  wrapperPhoto: {
    width: 120,
    height: 120,
    flexShrink: 0,
    backgroundColor: "#E8E8E8",
    position: "absolute",
    top: -60,
    borderRadius: 16,
  },
  btnAddPhoto: {
    position: "absolute",
    bottom: 12,
    right: -12,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  wrapperItem: {
    width: "100%",
  },
});
