import { configureStore } from '@reduxjs/toolkit';
import { registrationSlice } from './auth/registrationApi';
import { courseSlice } from './courses/coursesApi';
import { userSlice } from './user/userApi';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [courseSlice.reducerPath]: courseSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationSlice.middleware)
      .concat(courseSlice.middleware)
      .concat(userSlice.middleware)
});