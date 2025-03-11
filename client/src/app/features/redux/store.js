import { configureStore } from '@reduxjs/toolkit';
import { registrationSlice } from './auth/registrationApi';
import { courseSlice } from './courses/coursesApi';
import { userSlice } from './user/userApi';

export const store = configureStore({
  reducer: {
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [courseSlice.reducerPath]: courseSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationSlice.middleware)
      .concat(courseSlice.middleware)
      .concat(userSlice.middleware)
});