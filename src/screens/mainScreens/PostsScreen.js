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
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { user, userPhoto, email } = useSelector((state) => state.auth);

  const getAllPost = () => {
    onSnapshot(collection(db, "posts"), (data) => {
      const allPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(allPosts);
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
            paddingVertical: 12,
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
            source={
              userPhoto
                ? { uri: userPhoto }
                : require("../../../assets/images/dummy-user-photo.png")
            }
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
              {user}
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
              {email}
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ width: "100%", marginBottom: 18, flexGrow: 1 }}>
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
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row", gap: 24 }}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
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
                    style={{
                      flexDirection: "row",
                      gap: 6,
                    }}
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
    marginTop: 12,
    marginBottom: 4,
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
