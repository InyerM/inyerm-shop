import { createContext } from 'react'
import { ICartProduct, IShippingAddress } from '../../interfaces'

interface ContextProps {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number

  shippingAddress?: IShippingAddress

  addProduct: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  deleteCartProduct: (product: ICartProduct) => void
  updateAddress: (address: IShippingAddress) => void
}

export const CartContext = createContext( {} as ContextProps )