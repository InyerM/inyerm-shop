import Link from "next/link"
import { Typography, Grid, Card, CardContent, Divider, Box, Button } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layout"

const SummaryPage = () => {
  return (
    <ShopLayout title='Order Summary' description='Order summary' >
      <Typography variant='h1' component='h1'>Order Summary</Typography>
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
                <Button color='secondary' className='circular-btn' style={{ width: '100%' }}>Confirm Order</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage