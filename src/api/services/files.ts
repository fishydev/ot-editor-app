import { getRequest, postRequest, deleteRequest } from '../axios'
import { CreateFile } from "src/interfaces/files"

// export const createFile = async (uuid: string) => {
//   return postRequest(`files/${uuid}`)
// }

export const createFile = async (payload: CreateFile) => {
  return postRequest("files/create", payload)
}

export const getFileList = async () => {
  return getRequest("files/user")
}

export const deleteFile = async (fileId: number) => {
  return deleteRequest(`files/${fileId}`)
}