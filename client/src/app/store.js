import { configureStore } from '@reduxjs/toolkit'
import { registrationSlice } from './features/auth/registrationApi'

export const store = configureStore({
  reducer: {
    [registrationSlice.reducerPath]: registrationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registrationSlice.middleware),
})