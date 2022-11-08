import { Typography } from "@mui/material"
import { ShopLayout } from "../../components/layout"
import { ProductList } from "../../components/products"
import { FullScreenLoading } from "../../components/ui"
import { useProducts } from '../../hooks/useProducts'

const CategoryMenPage = () => {
  const { products, isLoading } = useProducts('/products/?gender=men')

  return (
    <ShopLayout title="InyerM-Shop - Men" description="Find the best products for men">
      <Typography variant="h1" component="h1">Men</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Products for men</Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default CategoryMenPage