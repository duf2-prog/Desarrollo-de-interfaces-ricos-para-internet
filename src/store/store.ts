import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice.ts";
import menuReducer from "./slices/menuSlice.ts";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
