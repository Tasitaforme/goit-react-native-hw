import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  user: null,
  userPhoto: null,
  email: null,
  password: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      user: payload.user,
      userPhoto: payload.userPhoto,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initialState,
  },
});

//export const authReducer = authSlice.reducer;
//export const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;
