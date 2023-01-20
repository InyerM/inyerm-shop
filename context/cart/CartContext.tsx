import { createContext } from "react"
import { ICartProduct, IOrder, IShippingAddress } from "../../interfaces"

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
  createOrder: () => Promise<{ hasError: boolean, message: string }>
}

export const CartContext = createContext({} as ContextProps)
