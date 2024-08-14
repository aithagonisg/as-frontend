import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export const getRootState = () => store.getState();
export const appDispatch = store.dispatch;
