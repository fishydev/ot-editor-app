import { createSlice } from "@reduxjs/toolkit"
import * as jwt from "jsonwebtoken"

export const fileSlice = createSlice({
  name: "auth",
  initialState: {
    openedFileId: null
  },
  reducers: {
    setOpenedFileId: (state, action) => {
      state.openedFileId = action.payload
    }
  }
})

export const {
  setOpenedFileId
} = fileSlice.actions

export default fileSlice.reducer