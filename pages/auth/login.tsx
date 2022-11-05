import { Box, Grid, Typography, TextField, Button } from '@mui/material'
import Link from 'next/link'
import { AuthLayout } from "../../components/layout"

const LoginPage = () => {
  return (
    <AuthLayout title="Login" description="Login to InyerM - Shop">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={ 2 } sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>Login</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' variant='filled' type='password' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
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
    </AuthLayout>
  )
}

export default LoginPage