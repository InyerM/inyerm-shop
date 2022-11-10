import { useState, useContext } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Grid, Typography, TextField, Button, Chip } from '@mui/material'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { AuthLayout } from "../../components/layout"
import { AuthContext } from '../../context'
import { validations } from '../../utils'
import { shopApi } from '../../api'
import { IAuthResponse } from '../../interfaces'

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { logginUser } = useContext(AuthContext)
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [isLogging, setIsLogging] = useState(false)

  const onSubmit = async({ email, password }: FormData) => {
    setIsLogging(true)
    const isValidLogin = await logginUser(email, password)
    
    if (!isValidLogin) {
      setShowError(true)
      
      setTimeout(() => {
        setShowError(false)
        setIsLogging(false)
      }, 1000);

      return
    }

    router.replace('/')
  }

  return (
    <AuthLayout title="Login" description="Login to InyerM - Shop">
      <form onSubmit={ handleSubmit(onSubmit) } noValidate>  
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={ 2 } sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Login</Typography>
              {
                showError && (
                  <Chip 
                    label="User or password are invalid" 
                    color="error" 
                    sx={{ mt: 2 }} 
                    icon={ <ErrorOutlinedIcon /> }
                    className='fadeIn'
                  />
                )
              }
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <TextField 
                type='email'
                label='Email' 
                variant='filled' 
                fullWidth
                {
                  ...register('email', {
                    required: 'Email is required',
                    validate: validations.isEmail
                  })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label='Password' 
                variant='filled' 
                type='password' 
                fullWidth
                {
                  ...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })
                }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button 
                color='secondary' 
                className='circular-btn' 
                size='large' 
                fullWidth 
                type='submit'
                disabled={ isLogging }
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <Link href='/auth/register' style={{ textDecoration: 'none', color: 'secondary.main' }}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage