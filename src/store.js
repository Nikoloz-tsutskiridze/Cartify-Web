import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./featured/cart/cartSlice";
import userReducer from "./featured/user/userSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
});
