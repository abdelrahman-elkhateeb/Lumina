import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: null,
  email: null,
  userPassword: null,
  userConfirmPass: null,
  userRole: null,
}

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
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

  }
})

export const { setUserName, setEmail, setUserPassword, setUserConfirmPass, setUserRole } = signUpSlice.actions
export default signUpSlice.reducer