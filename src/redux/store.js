import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userInfoSlice from "./userInfoSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userInfoSlice,
  },
});

export const getRootState = () => store.getState();
export const appDispatch = store.dispatch;
