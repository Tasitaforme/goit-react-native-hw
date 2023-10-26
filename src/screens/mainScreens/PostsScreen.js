import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import PostItem from "../../components/Post/PostItem";
import COLORS from "../../const/colors";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { user, userPhoto, email } = useSelector((state) => state.auth);

  const getAllPost = () => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (data) => {
      const allPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedAllPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(sortedAllPosts);
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
                color: COLORS.darkWP,
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
              <PostItem
                key={item.id}
                postId={item.id}
                title={item.title}
                uri={item.photo}
                postLocation={item.location}
                photoLocation={item.coordinates}
                screen={"PostsScreen"}
              />
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
});
