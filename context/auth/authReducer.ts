import { AuthState } from './AuthProvider'

type AuthAction = 
| { type: '', payload: boolean }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case '':
      return {
        ...state,
      }

    default:
      return state
  }
}