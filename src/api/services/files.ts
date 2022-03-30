import { getRequest, postRequest } from '../axios'
import { CreateFile } from "src/interfaces/files"

// export const createFile = async (uuid: string) => {
//   return postRequest(`files/${uuid}`)
// }

export const createFile = async (payload: CreateFile) => {
  return postRequest("files/create", payload)
}