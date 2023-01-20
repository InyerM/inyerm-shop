import { FC, useContext, useState } from "react"
import Link from "next/link"

import { Grid, CardActionArea, CardMedia, Typography, Box, Button } from "@mui/material"
import { ItemCounter } from "../ui"
import { ICartProduct, IOrderItem } from "../../interfaces"
import { CartContext } from "../../context"

interface Props {
  product: ICartProduct | IOrderItem
  editable?: boolean
}

export const CartProduct: FC<Props> = ({ product, editable = false }) => {
  const { _id, image, gender, price, quantity, size, slug, title } = product
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: _id || "",
    image,
    price,
    size,
    slug,
    title,
    gender,
    inStock: product?.inStock || 0,
    quantity,
  })

  const { updateCartQuantity, deleteCartProduct } = useContext(CartContext)

  const handleQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity,
    })

    updateCartQuantity({
      ...tempCartProduct,
      quantity,
    })
  }

  return (
    <Grid container spacing={2} sx={{ mb: 1 }}>
      <Grid item xs={12} sm={3}>
        <Link href={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={`/products/${product.image}`}
              alt={product.title}
              sx={{ borderRadius: "5px" }}
            />
          </CardActionArea>
        </Link>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1">
            Size: <strong>{tempCartProduct.size}</strong>
          </Typography>

          {editable ? (
            <ItemCounter
              currentValue={tempCartProduct.quantity}
              maxValue={tempCartProduct.inStock}
              handleQuantity={handleQuantity}
            />
          ) : (
            <Typography variant="body1">
              Quantity: <strong>{tempCartProduct.quantity}</strong>
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{ maxWidth: { xs: "80px" } }}>
        <Typography variant="subtitle1">${product.price}</Typography>
        {editable && (
          <Button
            variant="text"
            color="secondary"
            size="medium"
            onClick={() => deleteCartProduct(product as ICartProduct)}>
            Remove
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
