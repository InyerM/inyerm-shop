export interface IUser {
  _id: string
  name: string
  email: string
  password?: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export interface IAuthResponse {
  token: string
  user: IAuthUser
  message: string
}

export type IAuthUser = Pick<IUser, 'name' | 'email' | 'role'>