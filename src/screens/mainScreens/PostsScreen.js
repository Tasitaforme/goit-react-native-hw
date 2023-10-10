import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../const/colors";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

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
            paddingVertical: 20,
            // paddingBottom: 0,
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
            source={require("../../../assets/images/logophoto.jpg")}
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

        <View
          style={{
            width: "100%",
            marginBottom: 88,
            flexDirection: "column",
            paddingHorizontal: 16,
          }}
        >
          <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={{ width: "100%", marginBottom: 32 }}>
                <Image
                  style={{
                    height: 240,
                    width: "100%",
                    borderRadius: 16,
                    flexShrink: 0,
                  }}
                  source={{ uri: item.photo }}
                  resizeMode="cover"
                />
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", gap: 24 }}
                    onPress={() => navigation.navigate("Comments")}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name="comment"
                        size={24}
                        color={COLORS.accent}
                      />
                      <Text style={styles.itemText}>8</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                      <AntDesign name="like2" size={24} color={COLORS.accent} />
                      <Text style={styles.itemText}>150</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flexDirection: "row", gap: 6 }}
                    onPress={() => {
                      navigation.navigate("Map", {
                        location: item.coordinates,
                      });
                    }}
                  >
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color={COLORS.accent}
                    />
                    <Text
                      style={{
                        ...styles.itemText,
                        textDecorationLine: "underline",
                      }}
                    >
                      {item.location}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 16,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  itemText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
  },
});
