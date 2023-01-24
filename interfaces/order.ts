import { IShippingAddress, ISize, IUser } from "./"

export interface IOrder {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem[]
  shippingAddress: IShippingAddress
  paymentResult?: string
  numberOfItems: number
  subtotal: number
  tax: number
  total: number
  isPaid: boolean
  paidAt?: Date | string
  transactionId?: string
  createdAt?: Date | string
}

export interface IOrderItem {
  _id?: string
  title: string
  size: ISize
  quantity: number
  gender: "men" | "women" | "kid" | "unisex"
  slug: string
  price: number
  image: string
  inStock?: number
}
