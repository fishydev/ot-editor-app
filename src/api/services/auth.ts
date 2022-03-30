import { getRequest, postRequest } from '../axios'
import { Login, SignUp } from "src/interfaces/auth"

export const postSignUp = async (payload: SignUp) => {
  return postRequest(`user`, payload)
}

export const postLogin = async (payload: Login) => {
  return postRequest(`auth/login`, payload)
}