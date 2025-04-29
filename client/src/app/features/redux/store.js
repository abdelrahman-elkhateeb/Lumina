import { configureStore } from '@reduxjs/toolkit';
import { registrationSlice } from './auth/registrationApi';
import { courseSlice } from './courses/coursesApi';
import { userSlice } from './user/userApi';
import cartReducer from './cart/cartSlice';
import { paymentApi } from './cart/paymentApi';
import placementTestReducer from "./courses/placementTestSlice"

export const store = configureStore({
  reducer: {
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [courseSlice.reducerPath]: courseSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    cart: cartReducer,
    placementTest: placementTestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationSlice.middleware)
      .concat(courseSlice.middleware)
      .concat(userSlice.middleware)
      .concat(paymentApi.middleware)
});