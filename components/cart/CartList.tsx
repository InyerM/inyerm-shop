import { FC, useContext, useEffect, useState } from "react"

import { CartContext } from "../../context"
import { IOrderItem } from "../../interfaces"
import { CartProduct } from "./"

interface Props {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart } = useContext(CartContext)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const productsToRender = products ? products : cart

  return (
    <>
      {hasMounted &&
        productsToRender.map((product) => {
          return (
            <CartProduct product={product} editable={editable} key={product.slug + product.size} />
          )
        })}
    </>
  )
}
