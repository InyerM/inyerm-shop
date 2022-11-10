import { FC, useContext, useEffect, useState } from 'react'

import { CartContext } from '../../context'
import { CartProduct } from './'

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

  const { cart } = useContext(CartContext)

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <>
      {
        hasMounted && cart.map((product) => {
          return (
            <CartProduct product={ product } editable={ editable } key={ product.slug + product.size }/>
          )
        })
      }
    </>
  )
}