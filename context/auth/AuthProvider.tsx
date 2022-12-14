import { FC, useReducer, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { shopApi } from '../../api'
import { IAuthUser, IAuthResponse } from '../../interfaces'
import { AuthContext, authReducer } from './'
import { snackbarConfig } from '../../config';

export interface AuthState {
  isLoggedIn: boolean
  user?: IAuthUser
}

interface Props {
  children: React.ReactNode
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const { data, status } = useSession()

  useEffect(() => {
    if ( status === 'authenticated' ) {
      dispatch({ type: 'AUTH_LOGIN', payload: data?.user as IAuthUser })
    }

  }, [data, status])
  

  // useEffect(() => {
  //   checkToken()
  // }, [])

  const checkToken = async () => {
    const token = Cookies.get('token')

    try {   
      if (token) {
        const { data } = await shopApi.get<IAuthResponse>('/user/validate-token')
        const { user, token } = data
  
        if (user) {
          dispatch({
            type: 'AUTH_LOGIN',
            payload: user
          })

          Cookies.set('token', token)
        }
      }
    } catch (error) {
      if (token) {
        Cookies.remove('token')

        enqueueSnackbar('There was an error with your sessión, please login again', {
          variant: 'error',
          ...snackbarConfig,
          onClose: () => closeSnackbar(),
        })
      }
    }
  }
  

  const logginUser = async( email: string, password: string ): Promise<boolean> => {
    try {
      const { data } = await shopApi.post<IAuthResponse>('/user/login', { email, password })
      const { token, user } = data

      Cookies.set('token', token)

      dispatch({
        type: 'AUTH_LOGIN',
        payload: user
      })

      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async(name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await shopApi.post<IAuthResponse>('/user/register', { name, email, password })
      const { token, user } = data

      Cookies.set('token', token)

      dispatch({
        type: 'AUTH_LOGIN',
        payload: user
      })

      return {
        hasError: false
      }
    } catch (error) {
      if( axios.isAxiosError(error) ) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }

      return {
        hasError: true,
        message: 'An error has ocurred, try again'
      }
    }
  }

  const logout = () => {
    // Cookies.remove('token')
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('address2')
    Cookies.remove('zip')
    Cookies.remove('city')
    Cookies.remove('country')
    Cookies.remove('phone')
    signOut()
    // router.reload()
  }

  return (
    <AuthContext.Provider value={{ 
      ...state,

      //methods
      logginUser,
      registerUser,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}
