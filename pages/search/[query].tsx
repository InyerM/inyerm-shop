import { FC } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { Typography, Box } from '@mui/material';
import { ShopLayout } from "../../components/layout"
import { ProductList } from "../../components/products"
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'
import { capitalizeFirstLetter } from '../../utils'

interface Props {
  products: IProduct[]
  foundProducts: boolean
}

const SearchPage: FC<Props> = ({ products, foundProducts }) => {

  const { query } = useRouter()

  return (
    <ShopLayout title="InyerM-Shop - Home" description="Here you could find the best clothes">
      <Typography variant="h1" component="h1">Search products</Typography>
      {
        foundProducts
          ? <Typography variant="h2" sx={{ mb: 1 }}>All results for "{ capitalizeFirstLetter(query.query as string) }"</Typography>
          : (
            <Typography variant="h2" sx={{ mb: 1 }}>No products found for "{ capitalizeFirstLetter(query.query as string) }"</Typography>
          )
      }
      
      <ProductList products={ products } />
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }

  if(query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm( query )
  const foundProducts = products.length > 0

  if(!foundProducts) products = await dbProducts.getAllProducts()

  return {
    props: {
      products,
      foundProducts
    }
  }
}

export default SearchPage
