import { createContext } from 'react'
import { IAuthUser } from '../../interfaces'

interface ContextProps {
  isLoggedIn: boolean
  user?: IAuthUser
  logginUser: ( email: string, password: string ) => Promise<boolean>
  registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>
}

export const AuthContext = createContext( {} as ContextProps )