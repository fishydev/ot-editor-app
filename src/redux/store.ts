import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import fileReducer from "./files/fileSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    file: fileReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store