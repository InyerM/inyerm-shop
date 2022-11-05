import { FC } from 'react'
import Link from 'next/link'

import { Grid, CardActionArea, CardMedia, Typography, Box, Button } from '@mui/material';
import { initialData } from '../../database/products'
import { ItemCounter } from '../ui';

interface Props {
  editable?: boolean
}

const producsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
]

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {
        producsInCart.map((product, index) => {
          return (
            <Grid key={ product.slug } container spacing={ 2 } sx={{ mb: 1 }}>
              <Grid item xs={ 12 } sm={ 3 }>
                <Link href='/product/slug' style={{ textDecoration: 'none' }}>
                  <CardActionArea>
                    <CardMedia 
                      component='img'
                      image={ `/products/${ product.images[0] }` }
                      alt={ product.title }
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </Grid>
              <Grid item xs={ 12 } sm={ 7 }>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='body1'>{ product.title }</Typography>
                  <Typography variant='body1'>Size: <strong>M</strong></Typography>

                  {
                    editable 
                      ? <ItemCounter />
                      : <Typography variant='body1'>Quantity: <strong>1</strong></Typography>
                  }
                </Box>
              </Grid>
              <Grid item xs={ 12 } sm={ 2 } display='flex'  alignItems='center' flexDirection='column' sx={{ maxWidth: { xs: '80px' } }}> 
                <Typography variant='subtitle1'>${ product.price } €</Typography>
                {
                  editable && (
                    <Button variant='text' color='secondary' size='medium'>Remove</Button>
                  )
                }
              </Grid>
            </Grid>
          )
        })
      }
    </>
  )
}