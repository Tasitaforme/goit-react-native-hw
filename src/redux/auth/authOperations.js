import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./slice";

export const register =
  ({ user, email, password, userPhoto }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: user,
        photoURL: userPhoto,
      });
      const { uid, displayName, photoURL, email: emailBase } = auth.currentUser;

      const userUpdateProfile = {
        userId: uid,
        user: displayName,
        userPhoto: photoURL,
        email: emailBase,
      };
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };
export const login =
  ({ email, password }) =>
  async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        user: user.displayName,
        userPhoto: user.photoURL,
        email: user.email,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export const updateUserPhoto = (photo) => async (dispatch) => {
  try {
    const user = auth.currentUser;

    await updateProfile(user, {
      photoURL: photo,
    });

    const {
      uid,
      displayName,
      photoURL,
      email: emailBase,
    } = await auth.currentUser;

    const userUpdateProfile = {
      userId: uid,
      user: displayName,
      userPhoto: photoURL,
      email: emailBase,
    };

    dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
  } catch (error) {
    console.log(error.message);
  }
};
