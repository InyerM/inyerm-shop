import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import { Card, CardContent, Grid, Typography, Divider, Box, Button } from '@mui/material'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from "../../components/layout"
import { CartContext } from '../../context'

const CartPage = () => {

  const { push } = useRouter()
  const { numberOfItems } = useContext(CartContext)

  useEffect(() => {
    if(numberOfItems === 0) {
      push('/cart/empty')
    }
  }, [numberOfItems])
  

  return (
    <ShopLayout title={`Cart - ${ numberOfItems } ${ numberOfItems > 1 ? 'items' : 'item' }`} description='Shopping cart of store' >
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
                <Button color='secondary' className='circular-btn' style={{ width: '100%' }} onClick={ () => push('/checkout/summary') }>Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage