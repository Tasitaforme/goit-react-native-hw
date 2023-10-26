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
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";

import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import dummyUserLogo from "../../../assets/images/dummy-user-photo.png";
import ButtonWithIcon from "../ButtonWithIcon";
import { AntDesign } from "@expo/vector-icons";
import COLORS from "../../const/colors";
import { useState } from "react";
import { deleteComment } from "../../firebase/requests";

export default function CommentItem({
  comment,
  createdAt,
  owner,
  postId,
  commentId,
}) {
  const { userId } = useSelector((state) => state.auth);
  const [isDelBtnShow, setIsDelBtnShow] = useState(false);

  const delComment = () => {
    deleteComment(postId, commentId);
    setIsDelBtnShow(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsDelBtnShow(false)}
      onLongPress={() => {
        if (userId == owner.userId) {
          setIsDelBtnShow(true);
        }
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: userId !== owner.userId ? "row" : "row-reverse",
          marginBottom: 12,
          gap: 16,
        }}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            marginTop: 8,
          }}
          source={owner.userPhoto ? { uri: owner.userPhoto } : dummyUserLogo}
          alt="User photo"
          resizeMode="cover"
        />
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.03)",
            borderRadius: 16,
            flex: 1,
            borderTopLeftRadius: userId !== owner.userId ? 0 : 16,
            borderTopRightRadius: userId !== owner.userId ? 16 : 0,
            padding: 12,
            flexGrow: 1,
            gap: 8,
          }}
        >
          <Text style={styles.text}>{comment}</Text>
          <Text
            style={{
              ...styles.subText,
              alignSelf: userId !== owner.userId ? "flex-end" : "flex-start",
            }}
          >
            {moment(createdAt).locale("uk").format("DD MMMM, YYYY | HH:mm")}
          </Text>

          {isDelBtnShow && (
            <TouchableOpacity
              onPress={delComment}
              activeOpacity={0.7}
              style={{
                position: "absolute",
                margin: 0,
                padding: 0,
                bottom: 12,
                right: 12,
                height: 32,
                width: 32,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: COLORS.accent,
                borderRadius: 50,
              }}
            >
              <AntDesign name="delete" size={16} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
    color: "#212121",
  },
  subText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
