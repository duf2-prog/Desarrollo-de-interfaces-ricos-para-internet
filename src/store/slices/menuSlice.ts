import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../entities/entities";

const initialState: MenuItem[] = [
  {
    id: 1,
    name: "Hamburguesa de pollo",
    quantity: 40,
    desc: "Hamburguesa de pollo frito y mayonesa",
    price: 24,
    image: "cb.jpg"
  },
  {
    id: 2,
    name: "Hamburguesa vegetariana",
    quantity: 30,
    desc: "Hamburguesa vegetariana con aguacate",
    price: 22,
    image: "vb.jpg"
  },
  {
    id: 3,
    name: "Patatas fritas",
    quantity: 50,
    desc: "Patatas fritas crujientes con ketchup",
    price: 20,
    image: "chips.jpg"
  },
  {
    id: 4,
    name: "Helado",
    quantity: 30,
    desc: "Helado de vainilla cremoso",
    price: 15,
    image: "ic.jpg"
  }
];

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reduceStock(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.find(i => i.id === action.payload.id);
      if (item) item.quantity -= action.payload.quantity;
    }
  }
});

export const { reduceStock } = menuSlice.actions;
export default menuSlice.reducer;
