import { Typography } from "@mui/material"
import { ShopLayout } from "../components/layout"
import { ProductList } from "../components/products"
import { FullScreenLoading } from "../components/ui"
import { useProducts } from '../hooks/useProducts'

export default function HomePage() {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title="InyerM-Shop - Home" description="Here you could find the best clothes">
      <Typography variant="h1" component="h1">Shop</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>All products</Typography>
      {
        isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}
