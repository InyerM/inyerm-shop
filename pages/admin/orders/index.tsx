import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined"
import { Grid, Chip } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import useSWR from "swr"

import { AdminLayout } from "../../../components/layout"
import { IOrder, IUser } from "../../../interfaces"
import { currency } from "../../../utils"

const columns: GridColDef[] = [
  { field: "id", headerName: "Order id", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Full name", width: 300 },
  { field: "total", headerName: "Total", width: 150 },
  {
    field: "isPaid",
    headerName: "Payment status",
    width: 200,
    renderCell: ({ row }: GridRenderCellParams) =>
      row.isPaid ? (
        <Chip label="Paid" color="success" variant="outlined" />
      ) : (
        <Chip label="Pending" color="error" variant="outlined" />
      ),
  },
  { field: "noProducts", headerName: "N° Products", align: "center" },
  {
    field: "check",
    headerName: "Check order",
    renderCell: ({ row }: GridRenderCellParams) => (
      <a href={`/admin/orders/${row.id}`} target="_blank">
        Check order
      </a>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 250,
  },
]

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders")

  if (!data && !error) return <></>

  const rows = data!.map(({ _id, user, total, isPaid, numberOfItems, createdAt }) => ({
    id: _id,
    email: (user as IUser).email,
    name: (user as IUser).name,
    total: currency.format(total),
    isPaid,
    noProducts: numberOfItems,
    createdAt: new Date(createdAt as Date).toLocaleString(),
  }))

  return (
    <AdminLayout title="Orders" subtitle="Order management" icon={<ConfirmationNumberOutlined />}>
      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default OrdersPage
