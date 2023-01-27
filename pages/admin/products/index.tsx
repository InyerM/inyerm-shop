import Link from "next/link"
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import { Grid, CardMedia, Box, Button } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import useSWR from "swr"

import { AdminLayout } from "../../../components/layout"
import { IProduct } from "../../../interfaces"
import Product from "../../../models/Product"
import AddCircleOutline from "@mui/icons-material/AddCircleOutline"

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Image",
    renderCell: ({ row }: GridRenderCellParams) => (
      <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
        <CardMedia
          component="img"
          className="fadeIn"
          image={`/products/${row.img}`}
          alt={row.title}
        />
      </a>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => (
      <Link href={`/admin/products/${row.slug}`}>{row.title}</Link>
    ),
  },
  { field: "gender", headerName: "Gender" },
  { field: "type", headerName: "Type" },
  { field: "inStock", headerName: "In stock" },
  { field: "price", headerName: "Price" },
  { field: "sizes", headerName: "Sizes", width: 250 },
]

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products")

  if (!data && !error) return <></>

  const rows = data!.map(({ _id, images, title, gender, type, inStock, price, sizes, slug }) => ({
    id: _id,
    img: images[0],
    title,
    gender,
    type,
    inStock,
    price,
    sizes: sizes.join(", "),
    slug,
  }))

  return (
    <AdminLayout
      title={`Products (${data?.length})`}
      subtitle="Product management"
      icon={<CategoryOutlined />}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button startIcon={<AddCircleOutline />} color="secondary" href="/admin/products/new">
          Create Product
        </Button>
      </Box>
      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage
