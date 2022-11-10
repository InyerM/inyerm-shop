import { ICartProduct } from '../../interfaces'
import { CartState } from './CartProvider'

type CartAction = 
{ type: 'CART_LOADCART_FROM_COOKIES_STORAGE', payload: ICartProduct[] } |
{ type: 'CART_UPDATE_PRODUCTS', payload: ICartProduct[] } |
{ type: 'CART_UPDATE_PRODUCT_QUANTITY', payload: ICartProduct } |
{ type: 'CART_DELETE_PRODUCT', payload: ICartProduct } |
{ 
  type: 'CART_UPDATE_ORDER_SUMMARY', 
  payload: {
    numberOfItems: number
    subtotal: number
    tax: number
    total: number
  } 
}

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_LOADCART_FROM_COOKIES_STORAGE':
      return {
        ...state,
      }
    case 'CART_UPDATE_PRODUCTS':
      return {
        ...state,
        cart: [...action.payload]
      }
    case 'CART_UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map( product => {
          if (product._id !== action.payload._id) return product
          if (product.size !== action.payload.size) return product

          return action.payload
        })
      }

    case 'CART_DELETE_PRODUCT':
      return {
        ...state,
        cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
      }
    
    case 'CART_UPDATE_ORDER_SUMMARY':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}