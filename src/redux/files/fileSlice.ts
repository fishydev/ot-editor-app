import { createSlice } from "@reduxjs/toolkit"
import * as jwt from "jsonwebtoken"
import { IOpenedFile } from "src/interfaces/files"

export const fileSlice = createSlice({
  name: "auth",
  initialState: {
    openedFileUuid: null,
    openedFile: {} as IOpenedFile
  },
  reducers: {
    setOpenedFileUuid: (state, action) => {
      state.openedFileUuid = action.payload
    },
    setOpenedFile: (state, action) => {
      state.openedFile = action.payload
    }
  }
})

export const {
  setOpenedFileUuid,
  setOpenedFile
} = fileSlice.actions

export default fileSlice.reducer