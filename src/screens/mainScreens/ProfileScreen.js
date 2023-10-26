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
  Alert,
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
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PostItem from "../../components/Post/PostItem";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import {
  deleteCurrentUser,
  deletePhotoFromServer,
  uploadPhotoToServer,
} from "../../firebase/requests";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const { user, userId, userPhoto, email, password } = useSelector(
    (state) => state.auth
  );

  const [pickedPhoto, setPickedPhoto] = useState("");
  const [needUploadPhoto, setNeedUploadPhoto] = useState(false);
  const [userPosts, setUserPosts] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("owner.userId", "==", userId),
      orderBy("createdAt")
    );
    onSnapshot(q, (data) => {
      const allPosts = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const sortedAllPosts = allPosts.sort((a, b) => b.createdAt - a.createdAt);
      setUserPosts(sortedAllPosts);
    });
  }, []);

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedPhoto(result.assets[0].uri);
      setNeedUploadPhoto(true);
    }
  };

  const updateCurrentUserPhoto = async () => {
    const newUrl = await uploadPhotoToServer(pickedPhoto, "userImage");

    if (userPhoto) {
      deletePhotoFromServer(userPhoto);
    }

    dispatch(updateUserPhoto(newUrl));
    setPickedPhoto("");
    setNeedUploadPhoto(false);
  };

  const deleteUser = () => {
    Alert.alert(
      "Видалення аккаунту",
      "Ви дійсно бажаєте видалити поточного користувача? \n\nЯкщо користувач новостворений, то зможете його видалити лише після другого входу в додаток )))",
      [
        {
          text: "Так",
          onPress: () => {
            deletePhotoFromServer(userPhoto);
            deleteCurrentUser(email, password);
            dispatch(logout());
          },
        },
        {
          text: "Ні",
          onPress: () =>
            Alert.alert("Гарний вибір", "Дякуємо за довіру!", [], {
              cancelable: true,
            }),
          style: "cancel",
          cancelable: true,
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bg.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <SafeAreaView style={{ flex: 1 }}>
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
                  pickedPhoto
                    ? { uri: pickedPhoto }
                    : userPhoto
                    ? { uri: userPhoto }
                    : require("../../../assets/images/dummy-user-photo.png")
                }
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.btnAddPhoto}
                activeOpacity={0.8}
                onPress={pickPhoto}
              >
                <AntDesign name="pluscircleo" size={24} color={COLORS.accent} />
              </TouchableOpacity>

              {needUploadPhoto && (
                <TouchableOpacity
                  style={styles.btnUploadPhoto}
                  activeOpacity={0.8}
                  onPress={updateCurrentUserPhoto}
                >
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={COLORS.accent}
                  />
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

            <TitleMain text={user} marginTop={28} />

            <View
              style={{
                width: "100%",
                marginTop: 12,
                flexDirection: "column",
                gap: 32,
              }}
            >
              <FlatList
                data={userPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PostItem
                    key={item.id}
                    postId={item.id}
                    title={item.title}
                    uri={item.photo}
                    postLocation={item.location}
                    photoLocation={item.coordinates}
                    screen={"ProfileScreen"}
                  />
                )}
                ListFooterComponent={
                  <ButtonWithIcon
                    width={"100%"}
                    height={50}
                    backgroundColor={COLORS.darkWP}
                    onPress={deleteUser}
                    marginTop={24}
                    marginBottom={24}
                  >
                    <AntDesign name="delete" size={24} color="#fff" />
                  </ButtonWithIcon>
                }
              />
            </View>
          </View>
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
  btnUploadPhoto: {
    position: "absolute",
    top: 12,
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
