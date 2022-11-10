import { FC, useReducer } from 'react'
import { AuthContext, authReducer } from './'

export interface AuthState {

}

interface Props {
  children: React.ReactNode
}

const Auth_INITIAL_STATE: AuthState = {

}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( authReducer, Auth_INITIAL_STATE )

  return (
    <AuthContext.Provider value={{ 
      ...state 
    }}>
      { children }
    </AuthContext.Provider>
  )
}
