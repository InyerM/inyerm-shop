import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layout"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from '../../hooks/useProducts'

const CategoryKidPage = () => {
  const { products, isLoading } = useProducts('/products/?gender=kid')

  return (
    <ShopLayout title="InyerM-Shop - Kids" description="Find the best products for kids">
      <Typography variant="h1" component="h1">Kids</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Products for kids</Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryKidPage
