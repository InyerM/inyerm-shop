import { FC, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack'
import Cookie from 'js-cookie'
import { ICartProduct } from '../../interfaces'
import { CartContext, cartReducer } from './'
import { snackbarConfig } from '../../config'

export interface CartState {
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
}

interface Props {
  children: React.ReactNode
}

const CART_INITIAL_STATE: CartState = {
  cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
}

export const CartProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE )
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: 'CART_LOADCART_FROM_COOKIES_STORAGE', payload: cookieProducts })
    } catch (error) {
      dispatch({ type: 'CART_LOADCART_FROM_COOKIES_STORAGE', payload: [] })
    }
  }, [])
  

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subtotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * ( taxRate + 1 )
    }

    dispatch({
      type: 'CART_UPDATE_ORDER_SUMMARY',
      payload: orderSummary
    })
    
  }, [state.cart])


  useEffect(() => {
    Cookie.set('cart', JSON.stringify( state.cart ))
  }, [state.cart])

  const addProduct = (product: ICartProduct) => {
    try {
      const productInCart = state.cart.some(p => p._id === product._id)

      const productInCartWithDiferentSize = state.cart.some(p => p.size === product.size)

      if(!productInCartWithDiferentSize || !productInCart) {
        return dispatch({
          type: 'CART_UPDATE_PRODUCTS',
          payload: [...state.cart, product]
        })
      }
      
      const updatedCart = state.cart.map(p => {
        if(p._id === product._id) {
          return {
            ...p,
            quantity: p.quantity + product.quantity,
          }
        }
        return p
      })
  
      dispatch({
        type: 'CART_UPDATE_PRODUCTS',
        payload: updatedCart,
      })

    } catch (error) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }

  const updateCartQuantity = (product: ICartProduct) => {
    try {
  
      dispatch({
        type: 'CART_UPDATE_PRODUCT_QUANTITY',
        payload: product,
      })

    } catch (error) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }

  const deleteCartProduct = (product: ICartProduct) => {
    try {
      dispatch({
        type: 'CART_DELETE_PRODUCT',
        payload: product,
      })

      enqueueSnackbar('You have successfully removed a product of your cart', {
        variant: 'success',
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })


    } catch (error) {
      enqueueSnackbar('An error occurred', {
        variant: 'error',
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }


  return (
    <CartContext.Provider value={{ 
      ...state,

      // methods
      addProduct,
      updateCartQuantity,
      deleteCartProduct,
    }}>
      { children }
    </CartContext.Provider>
  )
}
