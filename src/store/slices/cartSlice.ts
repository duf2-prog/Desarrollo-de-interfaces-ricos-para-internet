import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../entities/entities";

interface CartEntry {
  item: MenuItem;
  quantity: number;
}

const initialState: CartEntry[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartEntry>) {
      state.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      return state.filter(entry => entry.item.id !== action.payload);
    },
    clearCart() {
      return [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
