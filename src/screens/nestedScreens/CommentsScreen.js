import {
  Image,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import COLORS from "../../const/colors";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import CommentItem from "../../components/Comment/CommentItem";
import { createComment } from "../../firebase/requests";

export default function CommentsScreen({ route }) {
  const flatListRef = useRef();
  const { height } = Dimensions.get("window");

  const { postId, photo } = route.params;
  const { userId, user, userPhoto } = useSelector((state) => state.auth);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  function handleSubmit() {
    keyboardHide();

    if (!comment) {
      return;
    }
    createComment(postId, comment, userId, user, userPhoto);
    setComment(null);

    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: height + 30,
        animated: true,
      });
      startTime(timeout);
    }, 1000);

    function startTime(time) {
      clearTimeout(time);
    }
  }

  useEffect(() => {
    onSnapshot(collection(db, "posts", postId, "comments"), (data) => {
      const allComments = data.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));
      const sortedAllComments = allComments.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setAllComments(sortedAllComments);
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={allComments}
            keyExtractor={(item) => item.commentId}
            style={{
              flexDirection: "column",
              marginTop: 8,
              width: "100%",
            }}
            ref={flatListRef}
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
              <CommentItem
                key={item.commentId}
                postId={postId}
                commentId={item.commentId}
                comment={item.comment}
                createdAt={item.createdAt}
                owner={item.owner}
              />
            )}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              marginBottom: isShowKeyboard
                ? Platform.OS === "ios"
                  ? 300
                  : 20
                : 20,
            }}
          >
            <View style={{ marginTop: 16, justifyContent: "flex-end" }}>
              <View>
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
                    paddingRight: 56,
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
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
});
