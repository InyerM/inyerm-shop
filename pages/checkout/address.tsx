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
import { ShopLayout } from "../../components/layout"

const addressOptions = [
  { label: 'Name' },
  { label: 'Lastname' },
  { label: 'Address' },
  { label: 'Address 2 (optional)' },
  { label: 'City' },
  { label: 'Zip' },
  { label: 'Country' },
  { label: 'Phone' },
]

const countries = [
  { label: 'Colombia', value: 1 },
  { label: 'Venezuela', value: 2 },
  { label: 'Peru', value: 3 },
]

const AddressPage = () => {
  return (
    <ShopLayout title='Address' description='Confirm destination address'>
      <Typography variant='h1' component='h1'>Address</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {
          addressOptions.map((option, index) => (
            option.label !== 'Country' 
            ? <Grid item xs={ 12 } sm={ 6 }>
                <TextField label={ option.label } variant='filled' fullWidth/>
              </Grid>
            : <Grid item xs={ 12 } sm={ 6 }>
              <FormControl fullWidth variant='filled'>
                <InputLabel id='country-label'>Country</InputLabel>
                <Select value={ 1 } placeholder={ option.label } labelId='country-label'>
                  {
                    countries.map(country => (
                      <MenuItem value={ country.value }>{ country.label }</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>

          ))
        }
      </Grid>
      <Box sx={{ mt: 3 }} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='medium'>Check order</Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage