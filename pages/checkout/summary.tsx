import { useContext, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Typography, Grid, Card, CardContent, Divider, Box, Button, Chip } from "@mui/material"
import { CartList, OrderSummary } from "../../components/cart"
import { ShopLayout } from "../../components/layout"
import { CartContext } from "../../context"
import { countries } from "../../utils"
import Cookies from "js-cookie"

const SummaryPage = () => {
  const router = useRouter()
  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (!Cookies.get("firstName")) router.push("/checkout/address")
    if (numberOfItems === 0) router.push("/cart/empty")
  }, [router])

  const onCreateOrder = async () => {
    setIsPosting(true)
    const { hasError, message } = await createOrder()

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    router.replace(`/orders/${message}`)
  }

  if (!shippingAddress) {
    return <></>
  }

  const { firstName, lastName, address, address2 = "", city, country, zip, phone } = shippingAddress

  return (
    <ShopLayout title="Order Summary" description="Order summary">
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <CartList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5" component="h2">
                Summary ({numberOfItems}
                {numberOfItems > 1 ? "products" : "product"})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Delivery Address</Typography>
                <Link href="/checkout/address" style={{ textDecoration: "none" }}>
                  <Button size="small">Edit</Button>
                </Link>
              </Box>

              <Typography>{`${firstName} ${lastName}`}</Typography>
              <Typography>{`${address}${address2 ? `, ${address2}` : ""}`}</Typography>
              <Typography>{`${city} - ${zip}`}</Typography>
              <Typography>{countries.find((c) => c.code === country)?.name}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="subtitle1">Order info</Typography>
                <Link href="/cart" style={{ textDecoration: "none" }}>
                  <Button size="small">Edit</Button>
                </Link>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  style={{ width: "100%" }}
                  onClick={onCreateOrder}
                  disabled={isPosting}>
                  Confirm Order
                </Button>
                <Chip
                  label={errorMessage}
                  color="error"
                  sx={{ mt: 1, display: errorMessage ? "flex" : "none" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
