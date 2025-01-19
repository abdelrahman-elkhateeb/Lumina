import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  email: null,
  userPassword: null,
  userConfirmPass: null,
  userRole: null,
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setUserPassword(state, action) {
      state.userPassword = action.payload;
    },
    setUserConfirmPass(state, action) {
      state.userConfirmPass = action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    resetSignUp(state) {
      state.username = null;
      state.email = null;
      state.userPassword = null;
      state.userConfirmPass = null;
      state.userRole = null;
    },
  }
})

export const { setUsername, setEmail, setUserPassword, setUserConfirmPass, setUserRole, resetSignUp } = signUpSlice.actions
export default signUpSlice.reducer 