import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../const/colors";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { db, storage } from "../../firebase/config";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserPhoto } from "../../redux/auth/authOperations";
import { auth } from "../../firebase/config";
import TitleMain from "../../components/TitleMain";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { user, userId, userPhoto } = useSelector((state) => state.auth);

  const [photo, setPhoto] = useState(userPhoto);
  const [pickedPhoto, setPickedPhoto] = useState("");
  const [userPosts, setUserPosts] = useState("");

  useEffect(() => {
    const userQuery = query(
      collection(db, "posts"),
      where("owner.userId", "==", userId)
    );
    onSnapshot(userQuery, (data) => {
      const allPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedAllPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);
      setUserPosts(sortedAllPosts);
    });
  }, []);

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(pickedPhoto);
      const file = await response.blob();
      const uniqPostId = Date.now().toString();

      const imageRef = ref(storage, `userImage/${uniqPostId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      console.log("processedPhoto", processedPhoto);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedPhoto(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const updateUserPhoto = async () => {
    const newUrl = await uploadPhotoToServer();
    console.log("newUrl", newUrl);
    dispatch(updateUserPhoto(newUrl));
    setPhoto(newUrl);
  };

  // if (pickedPhoto) {
  //   updateUserPhoto();
  //   setPickedPhoto("");
  // }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {/* <ScrollView style={{ flex: 1 }}> */}
          <View style={styles.wrapper}>
            <View style={styles.wrapperPhoto}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  borderRadius: 16,
                }}
                source={
                  photo
                    ? { uri: userPhoto }
                    : require("../../../assets/images/dummy-user-photo.png")
                }
                resizeMode="cover"
              />

              {!photo && (
                <TouchableOpacity
                  style={styles.btnAddPhoto}
                  activeOpacity={0.8}
                  onPress={pickPhoto}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={COLORS.accent}
                  />
                </TouchableOpacity>
              )}
              {photo && (
                <TouchableOpacity
                  style={styles.btnAddPhoto}
                  activeOpacity={0.8}
                  onPress={pickPhoto}
                >
                  <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={{
                marginTop: 22,
                marginLeft: "auto",
                opacity: 0.6,
              }}
              activeOpacity={1}
              onPress={() => dispatch(logout())}
            >
              <Feather name="log-out" size={24} color="#212121" />
            </TouchableOpacity>
            <TitleMain text={user} marginTop={32} />
            <View
              style={{
                width: "100%",
                marginTop: 32,
                flexDirection: "column",
                gap: 32,
              }}
            >
              <FlatList
                data={userPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View
                    style={{ width: "100%", marginBottom: 18, flexGrow: 1 }}
                  >
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
                          <AntDesign
                            name="like2"
                            size={24}
                            color={COLORS.accent}
                          />
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
          {/* </ScrollView> */}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    marginTop: 120,
    marginBottom: 0,
    paddingBottom: 110,
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
