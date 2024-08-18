import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { addUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
