import { Card, CardContent, Grid, Typography, Divider, Box, Button } from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from "../../components/layout"

const CartPage = () => {
  return (
    <ShopLayout title='Cart - 3' description='Shopping cart of store' >
      <Typography variant='h1' component='h1'>Cart</Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={ 12 } md={ 8 }>
          <CartList editable/>
        </Grid>
        <Grid item xs={ 12 } md={ 4 }>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h5' component='h2'>Order</Typography>
              <Divider sx={{ my: 1 }}/>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' style={{ width: '100%' }}>Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage