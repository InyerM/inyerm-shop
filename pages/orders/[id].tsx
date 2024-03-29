import { useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material"
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined"
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined"
import { useSnackbar } from "notistack"

import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layout"
import { dbOrders } from "../../database"
import { IOrder } from "../../interfaces"
import { countries } from "../../utils"
import { snackbarConfig } from "../../config"
import { shopApi } from "../../api"

export interface OrderResponseBody {
  id: string
  status: "COMPLETED" | "SAVED" | "APPROVED" | "VOIDED" | "COMPLETED" | "PAYER_ACTION_REQUIRED"
}
interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const router = useRouter()
  const [isPaying, setIsPaying] = useState(false)

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED")
      enqueueSnackbar("Payment was not completed", {
        variant: "error",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    setIsPaying(true)

    try {
      const { data } = await shopApi.post(`/orders/pay`, {
        orderId: order._id,
        transactionId: details.id,
      })

      enqueueSnackbar("Payment was completed", {
        variant: "success",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })

      router.reload()
    } catch (error) {
      enqueueSnackbar("Payment was not completed, there was an error", {
        variant: "error",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
      setIsPaying(false)
    }
  }

  return (
    <ShopLayout title="Summary of order" description="Summary of order">
      <Typography variant="h1" component="h1">
        Order {order._id}
      </Typography>
      {order.isPaid ? (
        <Chip
          sx={{ my: 2, p: 2 }}
          label="Order has been paid"
          variant="outlined"
          color="success"
          icon={<CreditCardOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2, p: 2 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Summary ({order.numberOfItems} items)
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Delivery Address</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{" "}
                {shippingAddress.address2 ? `, ${shippingAddress.address2}` : ""}
              </Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === shippingAddress.country)?.name}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Order info</Typography>
              </Box>
              <OrderSummary order={order} />
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Box
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? "flex" : "none" }}>
                  <CircularProgress />
                </Box>
                <Box sx={{ display: isPaying ? "none" : "flex", flex: 1 }} flexDirection="column">
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2, p: 2 }}
                      label="Order has been paid"
                      variant="outlined"
                      color="success"
                      icon={<CreditCardOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        })
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then(onOrderCompleted)
                      }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = "" } = query
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default OrderPage
