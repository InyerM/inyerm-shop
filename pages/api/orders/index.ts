import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { db } from "../../../database"
import { IOrder } from "../../../interfaces"
import { Order, Product } from "../../../models"

type Data = { message: string } | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return createOrder(req, res)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder

  const session: any = await getSession({ req })
  if (!session) return res.status(401).json({ message: "Unauthorized" })

  const productIds = orderItems.map((item) => item._id)
  await db.connect()

  const dbProducts = await Product.find({ _id: { $in: productIds } })

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find((product) => product.id == current._id)!.price
      if (!currentPrice) throw new Error("Product not found")

      return currentPrice * current.quantity + prev
    }, 0)
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
    const backendTotal = subtotal * (1 + taxRate)

    if (backendTotal !== total) throw new Error("Total is not correct")
    const userId = session.user._id
    const newOrder = new Order({
      ...req.body,
      isPaid: false,
      user: userId,
    })

    await newOrder.save()
    await db.disconnect()

    return res.status(201).json(newOrder)
  } catch (error: any) {
    console.log(error)
    await db.disconnect()
    return res.status(400).json({ message: error.message || "Something went wrong" })
  }
}
