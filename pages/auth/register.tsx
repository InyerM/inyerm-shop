import { useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Box, Grid, Typography, TextField, Button, Chip } from '@mui/material'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { AuthLayout } from "../../components/layout"
import { validations } from '../../utils'
import { AuthContext } from '../../context'

interface FormData {
  name: string
  email: string
  password: string
}

const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const { registerUser } = useContext(AuthContext)
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onRegister = async({ email, password, name }: FormData) => {
    setIsLoading(true)
    const { hasError, message } = await registerUser(name, email, password)

    if (hasError) {
      setShowError(true)
      setErrorMessage(message!)
      
      setTimeout(() => {
        setShowError(false)
        setIsLoading(false)
      }, 1000)

      return
    }

    router.replace(router.query.p?.toString() || '/')
  }
  
  return (
    <AuthLayout title="Register" description="Register to InyerM - Shop">
      <form onSubmit={ handleSubmit( onRegister ) } noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={ 2 } sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Create new account</Typography>
              {
                  showError && (
                    <Chip 
                      label={ errorMessage }
                      color="error" 
                      sx={{ mt: 2 }} 
                      icon={ <ErrorOutlinedIcon /> }
                      className='fadeIn'
                    />
                  )
                }
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
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
                label='Full name' 
                variant='filled' 
                fullWidth
                {
                  ...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Password must be at least 2 characters'
                    }
                  })
                }
                error={ !!errors.name }
                helperText={ errors.name?.message }
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
                disabled={ isLoading }
                type='submit'
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <Link 
                href={ router.query.p ? `/auth/login?p=${ router.query.p?.toString() || '/' }` : '/auth/login' } 
                style={{ textDecoration: 'none', color: 'secondary.main' }}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage