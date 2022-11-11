import { useContext } from 'react'
import { 
  Typography, 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box 
} from '@mui/material'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { ShopLayout } from "../../components/layout"
import { IShippingAddress } from '../../interfaces'
import { countries } from '../../utils'
import { CartContext } from '../../context'

interface FormData extends IShippingAddress {}
interface IAddressOptions {
  label: string
  formField: "firstName" | "lastName" | "address" | "address2" | "city" | "zip" | "country" | "phone"
  required?: boolean
}

const addressOptions: IAddressOptions[] = [
  { label: 'First name', formField: 'firstName', required: true },
  { label: 'Lastname', formField: 'lastName', required: true },
  { label: 'Address', formField: 'address', required: true },
  { label: 'Address 2 (optional)', formField: 'address2', required: false },
  { label: 'City', formField: 'city', required: true },
  { label: 'Zip' , formField: 'zip', required: true },
  { label: 'Country', formField: 'country', required: true },
  { label: 'Phone', formField: 'phone', required: true },
]

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || countries[0].code,
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  })

  const { updateAddress } = useContext(CartContext)

  const onSubmit = (data: FormData) => {
    updateAddress(data)

    router.push('/checkout/summary')
  } 

  return (
    <ShopLayout title='Address' description='Confirm destination address'>
      <Typography variant='h1' component='h1'>Address</Typography>
      <form onSubmit={ handleSubmit( onSubmit ) } noValidate>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {
            addressOptions.map((option, index) => (
              option.label !== 'Country' 
              ? <Grid item xs={ 12 } sm={ 6 } key={ index }>
                  <TextField 
                    label={ option.label } 
                    variant='filled' 
                    fullWidth
                    { ...register(option.formField, { required: option.required ? `${ option.label } is required` : false }) }
                    error={ !!errors[option.formField] }
                    helperText={ errors[option.formField]?.message }
                  />
                </Grid>
              : <Grid item xs={ 12 } sm={ 6 } key={ index }>
                <FormControl fullWidth variant='filled'>
                  <TextField
                    select
                    defaultValue={ countries[0].code } 
                    variant='filled'
                    label={ option.label }
                    { ...register(option.formField, { required: option.required ? `${ option.formField } is required` : false }) }
                    error={ !!errors[option.formField] }
                  >
                    {
                      countries.map(country => (
                        <MenuItem value={ country.code } key={ country.code }>{ country.name }</MenuItem>
                      ))
                    }
                  </TextField>
                </FormControl>
              </Grid>

            ))
          }
        </Grid>
        <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
          <Button color='secondary' className='circular-btn' size='medium' type='submit'>Check order</Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage