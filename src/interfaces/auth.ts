export interface SignUp {
  email: string
  username: string
  password: string
  confirmPassword?: string
}

export interface Login {
  username: string
  password: string
}

export interface LoginResponse {
  userId: number,
  username: string,
  token: string
}

export interface IUserData {
  userId: number,
  username: string
}