import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";

const store = configureStore({
  reducer: {
    Cart: CartReducer,
  },
});
export default store;
