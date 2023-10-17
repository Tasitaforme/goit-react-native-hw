import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { BlurView } from "expo-blur";
import COLORS from "../../const/colors";

import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
// import { Fontisto } from "@expo/vector-icons";

import ButtonWithIcon from "../../components/ButtonWithIcon";
import Button from "../../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, storage } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const initialState = {
  photo: "",
  title: "",
  location: "",
};

export default function CreatePostsScreen({ navigation }) {
  const { userId, user } = useSelector((state) => state.auth);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [state, setState] = useState(initialState);

  const handleOnchange = (text, input) => {
    setState((prevState) => ({ ...prevState, [input]: text }));
  };

  useEffect(() => {
    if (!state.title || !state.location || !state.photo) {
      setIsDisabledBtn(true);
    } else {
      setIsDisabledBtn(false);
    }
  }, [state]);

  const [hasPermissionCam, setHasPermissionCam] = useState(null);
  const [hasPermissionLoc, setHasPermissionLoc] = useState(null);
  // const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [geoLocation, setGeoLocation] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      // await MediaLibrary.requestPermissionsAsync();
      setHasPermissionCam(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      setHasPermissionLoc(status === "granted");

      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  if (hasPermissionCam === null || hasPermissionLoc === null) {
    return <View />;
  }
  if (hasPermissionCam === false) {
    return alert("No access to camera.");
  }
  if (hasPermissionLoc === false) {
    return alert("No access to location.");
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const { uri } = await cameraRef.current.takePictureAsync(options);
      setPhoto(uri);
      handleOnchange(uri, "photo");

      //await MediaLibrary.createAssetAsync(uri);
      // console.log(coords);
    }
  };
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      handleOnchange(result.assets[0].uri, "photo");
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadPostToServer = async ({ title, location }) => {
    try {
      const photo = await uploadPhotoToServer();

      await addDoc(collection(db, "posts"), {
        photo,
        title,
        location,
        coordinates: geoLocation,
        owner: { userId, user },
        createdAt: new Date().getTime(),
      });
    } catch (error) {
      console.log("error", error.message);
      throw error;
    }
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const uniqPostId = Date.now().toString();

      const imageRef = ref(storage, `postImage/${uniqPostId}`);
      await uploadBytes(imageRef, file);

      const processedPhoto = await getDownloadURL(imageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error", error.message);
    }
  };

  function handleSubmit() {
    if (!state.title || !state.location || !state.photo) {
      alert("You did not fill all information.");
    } else {
      uploadPostToServer(state);
      navigation.navigate("Posts", { ...state });
      setState(initialState);
      setPhoto(null);
      setGeoLocation(null);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingBottom: 32,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <BlurView intensity={100} style={styles.blurContainer}>
              <Camera
                style={{
                  width: "100%",
                  height: "100%",
                }}
                type={type}
                ref={cameraRef}
              >
                <ButtonWithIcon
                  backgroundColor={"transparent"}
                  width={60}
                  height={60}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                  alignSelf={"flex-end"}
                >
                  <MaterialIcons
                    name="flip-camera-ios"
                    size={28}
                    color={COLORS.accent}
                  />
                </ButtonWithIcon>
              </Camera>
              <ButtonWithIcon
                backgroundColor={"rgba(255, 255, 255, 0.30)"}
                width={60}
                height={60}
                onPress={takePhoto}
                position={"absolute"}
              >
                <MaterialIcons name="photo-camera" size={24} color="#fff" />
              </ButtonWithIcon>
              {photo && (
                <>
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      transform:
                        type === 1
                          ? Platform.OS === "ios"
                            ? [{ scaleX: 1 }]
                            : [{ scaleX: -1 }]
                          : Platform.OS === "ios"
                          ? [{ scaleX: -1 }]
                          : [{ scaleX: 1 }],
                    }}
                  />
                  <ButtonWithIcon
                    backgroundColor={"rgba(255, 255, 255, 0.30)"}
                    width={60}
                    height={60}
                    onPress={() => {
                      setPhoto(null);
                      handleOnchange("", "photo");
                    }}
                    position={"absolute"}
                  >
                    <AntDesign name="delete" size={24} color="#fff" />
                  </ButtonWithIcon>
                </>
              )}
            </BlurView>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 4,
                marginTop: 8,
                alignItems: "center",
              }}
              onPress={pickPhoto}
            >
              <SimpleLineIcons name="picture" size={24} color={COLORS.accent} />
              <Text
                style={{
                  color: "#BDBDBD",
                  fontFamily: "Roboto-Regular",
                  fontWeight: "400",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Завантажити фото з галереї
              </Text>
            </TouchableOpacity>

            <View style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                  flex: 1,
                  marginBottom: isShowKeyboard
                    ? Platform.OS === "ios"
                      ? 156
                      : 148
                    : 30,
                }}
              >
                <View>
                  <TextInput
                    style={{
                      marginBottom: 8,
                      paddingVertical: 8,
                      paddingLeft: 32,
                      color: "#212121",
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      fontSize: 16,
                      lineHeight: 18,
                      borderBottomWidth: 1,
                      borderColor: "#E8E8E8",
                    }}
                    placeholder="Назва..."
                    placeholderTextColor={"#BDBDBD"}
                    value={state.title}
                    onChangeText={(text) => handleOnchange(text, "title")}
                    onFocusFunc={setIsShowKeyboard}
                  ></TextInput>
                  <MaterialIcons
                    name="drive-file-rename-outline"
                    size={24}
                    color={COLORS.accent}
                    position={"absolute"}
                    bottom={14}
                    left={0}
                  />
                </View>
                <View>
                  <TextInput
                    style={{
                      marginBottom: 8,
                      paddingVertical: 8,
                      paddingLeft: 32,
                      color: "#212121",
                      fontFamily: "Roboto-Regular",
                      fontWeight: "400",
                      fontSize: 16,
                      lineHeight: 18,
                      borderBottomWidth: 1,
                      borderColor: "#E8E8E8",
                    }}
                    placeholder="Місцевість..."
                    placeholderTextColor={"#BDBDBD"}
                    value={state.location}
                    onChangeText={(text) => handleOnchange(text, "location")}
                    onFocusFunc={setIsShowKeyboard}
                  ></TextInput>
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color={COLORS.accent}
                    position={"absolute"}
                    bottom={14}
                    left={0}
                  />
                </View>

                <Button
                  disabled={isDisabledBtn}
                  text="Опублікувати"
                  onPress={() => handleSubmit()}
                  marginVertical={16}
                />
              </KeyboardAvoidingView>
            </View>
            <ButtonWithIcon
              disabled
              width={70}
              backgroundColor={"#F6F6F6"}
              onPress={() => setState("")}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </ButtonWithIcon>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
    minHeight: "100%",
  },
  blurContainer: {
    height: 240,
    width: "100%",
    backgroundColor: "#E8E8E8",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  form: {
    marginTop: 32,
    marginBottom: 16,
    justifyContent: "flex-end",
    width: "100%",
    flexGrow: 1,
  },
});
