import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { getSession } from "next-auth/react"
import { Typography, Grid, Chip } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ShopLayout } from "../../components/layout"
import { dbOrders } from "../../database"
import { IOrder } from "../../interfaces"

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full name", width: 700 },
  {
    field: "paid",
    headerName: "Paid",
    description: "It shows info if its paid",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Not paid" variant="outlined" />
      )
    },
  },
  {
    field: "order",
    headerName: "Check order",
    sortable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link href={`/orders/${params.row.orderId}`} style={{ textDecoration: "none" }}>
          Check order
        </Link>
      )
    },
  },
]
interface Props {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, index) => ({
    id: index + 1,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    paid: order.isPaid,
    orderId: order._id,
  }))

  return (
    <ShopLayout title="Order History" description="Client order history">
      <Typography variant="h1" component="h1">
        Order history
      </Typography>

      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    }
  }

  return {
    props: {
      orders: await dbOrders.getOrderByUser(session.user._id),
    },
  }
}

export default HistoryPage
