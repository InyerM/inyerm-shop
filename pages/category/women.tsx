import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layout"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from '../../hooks/useProducts'

const CategoryWomenPage = () => {
  const { products, isLoading } = useProducts('/products/?gender=women')

  return (
    <ShopLayout title="InyerM-Shop - Women" description="Find the best products for women">
      <Typography variant="h1" component="h1">Women</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Products for women</Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryWomenPage