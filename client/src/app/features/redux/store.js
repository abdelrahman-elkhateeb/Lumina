import { configureStore } from '@reduxjs/toolkit';
import { registrationSlice } from './auth/registrationApi';
import { courseSlice } from './courses/coursesApi';

export const store = configureStore({
  reducer: {
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [courseSlice.reducerPath]: courseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(registrationSlice.middleware)
      .concat(courseSlice.middleware),
});