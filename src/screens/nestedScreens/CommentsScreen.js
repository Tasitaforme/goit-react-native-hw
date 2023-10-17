import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../const/colors";
import moment from "moment";
import "moment/locale/uk";
import { AntDesign } from "@expo/vector-icons";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/config";
// const initialState = {
//   comment: "",
//   userIcon: "",
//   dataTime: "",
// };

export default function CommentsScreen({ route }) {
  const { postId, photo } = route.params;
  const { userId, user, userPhoto } = useSelector((state) => state.auth);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  // const handleOnchange = (text, input) => {
  //   setComment((prevState) => ({ ...prevState, [input]: text }));
  // };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = async () => {
    if (!comment) {
      return;
    }
    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        comment,
        owner: { userId, user, userPhoto },
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.log(error.code);
    }
  };

  function handleSubmit() {
    keyboardHide();
    console.log(comment);
    createComment();
    setComment("");
  }
  useEffect(() => {
    onSnapshot(collection(db, "posts", postId, "comments"), (data) => {
      const allComments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));

      setAllComments(allComments);
      console.log(allComments);
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.commentId}
            style={{
              flexDirection: "column",
              marginTop: 8,
              width: "100%",
            }}
            ListHeaderComponent={
              <Image
                style={{
                  height: 240,
                  width: "100%",
                  borderRadius: 16,
                  marginBottom: 12,
                }}
                source={{ uri: photo }}
                resizeMode="cover"
              />
            }
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginRight: 16,
                    marginTop: 16,
                  }}
                  source={
                    item.owner.userPhoto
                      ? { uri: item.owner.userPhoto }
                      : require("../../../assets/images/dummy-user-photo.png")
                  }
                  resizeMode="cover"
                />
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    borderRadius: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    flexGrow: 1,
                  }}
                >
                  <Text style={styles.text}>{item.comment}</Text>
                  <Text style={styles.subText}>
                    {moment(item.createdAt)
                      .locale("uk")
                      .format("DD MMMM, YYYY | HH:mm")}
                  </Text>
                </View>
              </View>
            )}
            ListFooterComponent={
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  marginBottom: isShowKeyboard
                    ? Platform.OS === "ios"
                      ? 300
                      : 0
                    : 0,
                }}
              >
                <View style={{ marginTop: 16 }}>
                  <TextInput
                    style={{
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      fontSize: 16,
                      lineHeight: 18,
                      borderRadius: 50,
                      borderColor: "#E8E8E8",
                      backgroundColor: "#F6F6F6",
                      paddingVertical: 16,
                      paddingLeft: 16,
                      height: 50,
                    }}
                    name={"comment"}
                    placeholder="Коментувати..."
                    value={comment}
                    onFocus={() => setIsShowKeyboard(true)}
                    onSubmitEditing={() => keyboardHide()}
                    onChangeText={(text) => setComment(text)}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 100,
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      position: "absolute",
                      top: 4,
                      right: 8,
                      backgroundColor: COLORS.accent,
                    }}
                    activeOpacity={0.9}
                    onPress={() => handleSubmit()}
                  >
                    <AntDesign name="arrowup" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            }
          />
          {/* {allComments &&
            allComments.map(({ commentId, comment, owner, createdAt }) => (
              <View
                key={commentId}
                style={{
                  flexDirection: "column",
                  marginTop: 20,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      marginRight: 16,
                      marginTop: 16,
                    }}
                    source={
                      owner.userPhoto
                        ? { uri: owner.userPhoto }
                        : require("../../../assets/images/dummy-user-photo.png")
                    }
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.03)",
                      borderRadius: 6,
                      paddingHorizontal: 12,
                      paddingVertical: 12,
                      flexGrow: 1,
                    }}
                  >
                    <Text style={styles.text}>{comment}</Text>
                    <Text style={styles.subText}>
                      {moment(createdAt)
                        .locale("uk")
                        .format("DD MMMM, YYYY | HH:mm")}
                    </Text>
                  </View>
                </View>
              </View>
            ))} */}

          {/* <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Image
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 50,
                  marginRight: 16,
                  marginTop: 16,
                }}
                source={require("../../../assets/images/logophoto.jpg")}
                resizeMode="cover"
              />
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  borderRadius: 6,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                }}
              >
                <Text
                  style={styles.text}
                  android_hyphenationFrequency={"normal"}
                >
                  A fast 50mm like f1.8 would help with the bokeh. I’ve been
                  using primes as they tend to get a bit sharper images.
                </Text>
                <Text style={styles.subText}>09 червня, 2020 | 08:40</Text>
              </View>
            </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#212121",
    width: "auto",
  },
  subText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    marginTop: 8,
    // alignSelf: "flex-end",
  },
});
