import { getRequest, postRequest } from '../axios'

export const createFile = async (uuid: string) => {
  return postRequest(`files/${uuid}`)
}
