import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { auth, db, storage } from "../firebase/config";
import { collection, deleteDoc, doc, setDoc, addDoc } from "firebase/firestore";

export const deleteCurrentUser = async () => {
  const user = auth.currentUser;
  user.delete();
};

export const uploadPhotoToServer = async (photo, typeOfImage) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqPostId = Date.now().toString();
    const imageRef = ref(storage, `${typeOfImage}/${uniqPostId}`);

    await uploadBytes(imageRef, file);

    const urlPhoto = await getDownloadURL(imageRef);
    return urlPhoto;
  } catch (error) {
    console.log("error", error.message);
  }
};

export const deletePhotoFromServer = async (photo) => {
  try {
    const desertRef = ref(storage, photo);
    deleteObject(desertRef);
  } catch (error) {
    console.log("error", error.message);
  }
};

export const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, "posts", `${postId}`));
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (
  postId,
  comment,
  userId,
  user,
  userPhoto
) => {
  try {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: comment,
      owner: { userId, user, userPhoto },
      createdAt: new Date().getTime(),
    });
  } catch (error) {
    console.log(error.code);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    await deleteDoc(doc(db, "posts", postId, "comments", `${commentId}`));
  } catch (error) {
    console.log(error);
  }
};

export const addLike = async (postId, userId, userName) => {
  const uniqLikeId = userId;
  try {
    const docRef = doc(db, "posts", postId, "likes", uniqLikeId);
    await setDoc(docRef, {
      ownerId: userId,
      ownerName: userName,
    });
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLike = async (postId, userId) => {
  try {
    const docRef = doc(db, "posts", postId, "likes", userId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};
