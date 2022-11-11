import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession, signIn, getProviders } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Box, Grid, Typography, TextField, Button, Chip, Divider } from '@mui/material'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import { AuthLayout } from "../../components/layout"
import { validations } from '../../utils'

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  // const { logginUser } = useContext(AuthContext)
  const router = useRouter()
  const [showError, setShowError] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [providers, setProviders] = useState<any>({})

  useEffect(() => {
    getProviders().then((data) => setProviders(data))
  }, [])
  

  const onSubmit = async({ email, password }: FormData) => {
    setIsLogging(true)
    const isValidLogin = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    const { error } = isValidLogin!

    if (error) {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
        setIsLogging(false)
      }, 1500)

      return
    }

    router.replace(router.query.p?.toString() || '/')
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
              <Link href={ 
                router.query.p ? `/auth/register?p=${ router.query.p?.toString() || '/' }` : '/auth/register' } 
                style={{ textDecoration: 'none', color: 'secondary.main' }}>
                Don't have an account? Register
              </Link>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='center' flexDirection='column'>
              <Divider sx={{ width: '100%', mb: 2 }}/>

              {
                Object.values(providers).map((provider: any) => {
                  if (provider.name === 'Credentials') return null

                  return (
                    <Button
                      key={ provider.name }
                      onClick={ () => signIn( provider.id ) }
                      variant='outlined'
                      color='secondary'
                      sx={{ mb: 1, borderRadius: '30px' }}
                    >
                      Login with { provider.name }
                    </Button>
                  )
                })
              }
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  
  const session = await getSession({ req })

  const { p = '/' } = query


  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}

export default LoginPage