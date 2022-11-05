import Link from "next/link"
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip } from '@mui/material';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined'
import CreditCardOutlined from '@mui/icons-material/CreditCardOutlined'
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layout"

const OrderPage = () => {
  return (
    <ShopLayout title='Summary of order 123' description='Summary of order 123' >
      <Typography variant='h1' component='h1'>Order 123</Typography>
      {/* <Chip 
        sx={{ my: 2, p: 2 }} 
        label='Pending payment' 
        variant='outlined' 
        color="error"
        icon={ <CreditCardOffOutlined /> }
      /> */}
      <Chip 
        sx={{ my: 2, p: 2 }} 
        label='Order has been paid' 
        variant='outlined' 
        color="success"
        icon={ <CreditCardOutlined /> }
      />
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={ 12 } md={ 8 }>
          <CartList />
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h5' component='h2'>Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }}/>

              <Box display='flex' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='subtitle1'>Delivery Address</Typography>
                <Link href='/checkout/address' style={{ textDecoration: 'none' }}>
                  <Button size='small'>Edit</Button>
                </Link>
              </Box>

              <Typography>Inyer Marin</Typography>
              <Typography>3232 some place</Typography>
              <Typography>Pereira 660006</Typography>
              <Typography>Colombia</Typography>
              <Typography>+57 3195963135</Typography>

              <Divider sx={{ my: 1 }}/>

              <Box display='flex' justifyContent='space-between' sx={{ mb: 1 }}>
                <Typography variant='subtitle1'>Order info</Typography>
                <Link href='/cart' style={{ textDecoration: 'none' }}>
                  <Button size='small'>Edit</Button>
                </Link>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' style={{ width: '100%' }}>Go to pay</Button>
              </Box>
              <Chip 
                sx={{ my: 2, p: 2 }} 
                label='Order has been paid' 
                variant='outlined' 
                color="success"
                icon={ <CreditCardOutlined /> }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage