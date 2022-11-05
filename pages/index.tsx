import { Typography } from "@mui/material"
import { ShopLayout } from "../components/layout"
import { ProductList } from "../components/products/ProductList"
import { initialData } from '../database/products'

export default function Home() {
  return (
    <ShopLayout title="InyerM-Shop - Home" description="Here you could find the best clothes">
      <Typography variant="h1" component="h1">Home</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>All products</Typography>

      <ProductList products={ initialData.products }/>
    </ShopLayout>
  )
}
