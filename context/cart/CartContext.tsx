import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'

interface ContextProps {
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number

  addProduct: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext( {} as ContextProps )