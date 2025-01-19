import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: null,
  password: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email
      state.password = action.payload.password
    },
    logout(state) {
      state.email = null
      state.password = null
    },
  },
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;