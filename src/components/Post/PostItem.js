import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import COLORS from "../../const/colors";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
  addLike,
  deleteLike,
  deletePhotoFromServer,
  deletePost,
} from "../../firebase/requests";

export default function PostItem({
  postId,
  title,
  uri,
  postLocation,
  photoLocation,
  screen,
}) {
  const navigation = useNavigation();
  const { userId, user, userPhoto, email } = useSelector((state) => state.auth);

  const [allComments, setAllComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);
  const [userPutLike, setUserPutLike] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, "posts", postId, "comments");
    onSnapshot(commentsRef, (data) => {
      const dbComments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      setAllComments(dbComments);
    });
  }, []);

  useEffect(() => {
    const likesRef = collection(db, "posts", postId, "likes");
    onSnapshot(likesRef, (data) => {
      const dbLikes = data.docs.map((doc) => ({
        likeId: doc.id,
        ...doc.data(),
      }));
      const didUserPutLike = dbLikes.some((el) => el.likeId === userId);
      setUserPutLike(didUserPutLike);
      setAllLikes(dbLikes);
    });
  }, []);

  const handleLikes = () => {
    if (!userPutLike) {
      addLike(postId, userId, user);
      return;
    }
    deleteLike(postId, userId);
  };

  const delPost = () => {
    deletePost(postId);
    deletePhotoFromServer(uri);
  };

  return (
    <View style={{ width: "100%", marginBottom: 18, flexGrow: 1 }}>
      <View>
        <Image
          style={{
            height: 240,
            width: "100%",
            borderRadius: 16,
            flexShrink: 0,
          }}
          source={{ uri: uri }}
          alt={title}
          resizeMode="cover"
        />
        {screen == "ProfileScreen" && (
          <TouchableOpacity
            onPress={delPost}
            activeOpacity={0.7}
            style={{
              position: "absolute",
              margin: 0,
              padding: 0,
              top: 12,
              right: 12,
              height: 32,
              width: 32,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.30)",
              borderRadius: 50,
            }}
          >
            <AntDesign name="delete" size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.itemTitle}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 24 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
            }}
            onPress={() =>
              navigation.navigate("Comments", {
                postId: postId,
                photo: uri,
              })
            }
          >
            <FontAwesome
              name={allComments.length > 0 ? "comment" : "comment-o"}
              size={24}
              color={COLORS.accent}
            />
            <Text style={styles.itemText}>{allComments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: "row", gap: 6 }}>
            <AntDesign
              name={!userPutLike ? "like2" : "like1"}
              size={24}
              color={COLORS.accent}
              onPress={handleLikes}
            />
            <Text style={styles.itemText}>{allLikes.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 6,
          }}
          onLongPress={() => {
            navigation.navigate("Map", {
              location: photoLocation,
              cityName: postLocation,
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
            {postLocation}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
