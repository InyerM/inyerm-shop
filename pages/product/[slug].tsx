import { FC, useContext, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, Grid, Typography, Chip } from '@mui/material'
import { useSnackbar } from 'notistack'

import { ShopLayout } from '../../components/layout'
import { ProductSizeSelector, ProductSlideshow } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { CartContext } from '../../context'
import { snackbarConfig } from '../../config'

interface Props {
  product: IProduct
}

const ProductPage: FC<Props> = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    inStock: product.inStock,
    quantity: 1,
  })
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { addProduct } = useContext(CartContext)

  const handleSelectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size,
    })
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }));
  }

  const handleAddToCart = () => {
    if(!tempCartProduct.size) {
      enqueueSnackbar('You must to select a size', {
        variant: 'error',
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
      return
    }

    addProduct(tempCartProduct)

    enqueueSnackbar('Updated successfully to your cart', {
      variant: 'success',
      ...snackbarConfig,
      onClose: () => closeSnackbar(),
    })
  }

  return (
    <ShopLayout title={ product.title } description={ product.description }>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 7 }>
          <ProductSlideshow  images={ product.images }/>
        </Grid>

        <Grid item xs={ 12 } sm={ 5 }>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{ product.title }</Typography>
            <Typography variant='subtitle1' component='h2'>${ product.price }</Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter 
                currentValue={ tempCartProduct.quantity } 
                maxValue={ product.inStock }
                handleQuantity={ onUpdateQuantity }
              />
              <ProductSizeSelector sizes={ product.sizes } selectedSize={ tempCartProduct.size } onSelectedSize={ handleSelectedSize }/>
            </Box>

            {
              product.inStock === 0 ? (
                <Chip label='Not available' color='error' />
              ) : (
                <Button color='secondary' className='circular-btn' onClick={ handleAddToCart }>
                  {
                    tempCartProduct.size ? 'Add to cart' : 'Select size'
                  }
                </Button>
              )
            }

            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{ product.description }</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductsSlug()

  const paths = slugs.map((obj) => ({
    params: { slug: obj.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if(!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage