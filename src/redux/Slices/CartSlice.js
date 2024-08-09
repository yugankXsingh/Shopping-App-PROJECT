import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    },

    removeOne: (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { add, remove, removeOne } = CartSlice.actions;
export default CartSlice.reducer;
