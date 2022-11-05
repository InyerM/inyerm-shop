import { Box, Grid, Typography, TextField, Button } from '@mui/material'
import Link from 'next/link'
import { AuthLayout } from "../../components/layout"

const RegisterPage = () => {
  return (
    <AuthLayout title="Register" description="Register to InyerM - Shop">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={ 2 } sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>Create new account</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label='Email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Full name' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Password' variant='filled' type='password' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='center'>
            <Link href='/auth/login' style={{ textDecoration: 'none', color: 'secondary.main' }}>
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage