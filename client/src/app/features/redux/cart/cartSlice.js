import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const alreadyInCart = state.cartItems.find((item) => item._id === course._id);

      if (alreadyInCart) {
        alreadyInCart.quantity += 1;
        state.totalPrice += +course.price;
        state.totalItems += 1;
      } else {
        state.cartItems.push({
          ...course,
          quantity: 1,
        });
        state.totalPrice += +course.price;
        state.totalItems += 1;
      }
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const course = state.cartItems.find((item) => item._id === courseId);

      if (course) {
        if (course.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item._id !== courseId);
          state.totalPrice -= +course.price;
          state.totalItems -= 1;
        } else {
          course.quantity -= 1;
          state.totalPrice -= +course.price;
          state.totalItems -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
