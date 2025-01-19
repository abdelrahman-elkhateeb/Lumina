import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "../features/registration/login/loginSlice"
import signUpReducer from "../features/registration/signup/signupSlice"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: signUpReducer,
  },
})