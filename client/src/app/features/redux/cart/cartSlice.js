import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    courses: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const alreadyInCart = state.courses.find((item) => item._id === course._id);
      if (!alreadyInCart) {
        state.courses.push(course);
        state.total += +course.price;
      }
    },
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const course = state.courses.find((item) => item._id === courseId);
      if (course) {
        state.courses = state.courses.filter((item) => item._id !== courseId);
        state.totalPrice -= +course.price;
      }
    },
    clearCart: (state) => {
      state.courses = [];
      state.totalPrice = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
