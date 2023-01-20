import { FC, useEffect, useReducer } from "react"
import { useSnackbar } from "notistack"
import Cookie from "js-cookie"
import { ICartProduct, IOrder, IShippingAddress } from "../../interfaces"
import { CartContext, cartReducer } from "./"
import { snackbarConfig } from "../../config"
import { shopApi } from "../../api"
import axios from "axios"

export interface CartState {
  isLoaded: boolean
  cart: ICartProduct[]
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
  shippingAddress?: IShippingAddress
}

interface Props {
  children: React.ReactNode
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : []
      dispatch({ type: "CART_LOADCART_FROM_COOKIES_STORAGE", payload: cookieProducts })
    } catch (error) {
      dispatch({ type: "CART_LOADCART_FROM_COOKIES_STORAGE", payload: [] })
    }
  }, [])

  useEffect(() => {
    loadAddress()
  }, [])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subtotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0,
    )
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (taxRate + 1),
    }

    dispatch({
      type: "CART_UPDATE_ORDER_SUMMARY",
      payload: orderSummary,
    })
  }, [state.cart])

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart))
  }, [state.cart])

  const loadAddress = () => {
    if (Cookie.get("firstName") !== undefined) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        city: Cookie.get("city") || "",
        zip: Cookie.get("zip") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      }

      dispatch({
        type: "CART_LOAD_ADDRESS_FROM_COOKIES",
        payload: shippingAddress,
      })
    }
  }

  const updateAddress = (address: IShippingAddress) => {
    Cookie.set("firstName", address.firstName)
    Cookie.set("lastName", address.lastName)
    Cookie.set("address", address.address)
    Cookie.set("address2", address.address2 || "")
    Cookie.set("zip", address.zip)
    Cookie.set("city", address.city)
    Cookie.set("country", address.country)
    Cookie.set("phone", address.phone)

    dispatch({
      type: "CART_UPDATE_ADDRESS",
      payload: address,
    })
  }

  const addProduct = (product: ICartProduct) => {
    try {
      const productInCart = state.cart.some((p) => p._id === product._id)

      const productInCartWithDiferentSize = state.cart.some((p) => p.size === product.size)

      if (!productInCartWithDiferentSize || !productInCart) {
        return dispatch({
          type: "CART_UPDATE_PRODUCTS",
          payload: [...state.cart, product],
        })
      }

      const updatedCart = state.cart.map((p) => {
        if (p._id === product._id) {
          return {
            ...p,
            quantity: p.quantity + product.quantity,
          }
        }
        return p
      })

      dispatch({
        type: "CART_UPDATE_PRODUCTS",
        payload: updatedCart,
      })
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }

  const updateCartQuantity = (product: ICartProduct) => {
    try {
      dispatch({
        type: "CART_UPDATE_PRODUCT_QUANTITY",
        payload: product,
      })
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }

  const deleteCartProduct = (product: ICartProduct) => {
    try {
      dispatch({
        type: "CART_DELETE_PRODUCT",
        payload: product,
      })

      enqueueSnackbar("You have successfully removed a product of your cart", {
        variant: "success",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    } catch (error) {
      enqueueSnackbar("An error occurred", {
        variant: "error",
        ...snackbarConfig,
        onClose: () => closeSnackbar(),
      })
    }
  }

  const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {
    if (!state.shippingAddress) throw new Error("Shipping address is required")
    const { cart, numberOfItems, shippingAddress, subtotal, total, tax } = state

    const body: IOrder = {
      orderItems: cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress,
      numberOfItems,
      subtotal,
      tax,
      total,
      isPaid: false,
    }
    try {
      const { data } = await shopApi.post<IOrder>("/orders", body)
      dispatch({ type: "CART_ORDER_COMPLETE" })

      return {
        hasError: false,
        message: data._id!,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }

      return {
        hasError: true,
        message: "An error occurred",
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProduct,
        updateCartQuantity,
        deleteCartProduct,
        updateAddress,

        // order
        createOrder,
      }}>
      {children}
    </CartContext.Provider>
  )
}
