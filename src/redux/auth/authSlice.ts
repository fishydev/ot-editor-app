import { createSlice } from "@reduxjs/toolkit"
import * as jwt from "jsonwebtoken"
import { IUserData } from "src/interfaces/auth"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoggedIn: false,
    userData: {
      userId: 0,
      username: ""
    } as IUserData
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      state.isLoggedIn = true
    },
    removeToken: state => {
      state.token = "",
      state.isLoggedIn = false
    },
    setUser: (state, action) => {
      state.userData = action.payload
    },
    removeUser: state => {
      state.userData = {
        userId: "",
        username: ""
      }
    }
  }
})

export const {
  setToken,
  removeToken,
  setUser,
  removeUser
} = authSlice.actions

export default authSlice.reducer