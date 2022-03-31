import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
    removeToken: state => {
      state.token = "",
      state.isLoggedIn = false
    }
  }
})

export const {
  setToken,
  removeToken
} = authSlice.actions

export default authSlice.reducer