import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Order, Product, User } from "../../../models"

type Data = {
  numberOfOrders: number
  paidOrders: number
  notPaidOrders: number
  numberOfProducts: number
  numberOfClients: number
  productsWithNoStock: number
  productsWithLowStock: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getDashboardData(req, res)
    default:
      return res.status(405).end()
  }
}

async function getDashboardData(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoStock,
    productsWithLowStock,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: "client" }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ])
  await db.disconnect()

  return res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfProducts,
    numberOfClients,
    productsWithNoStock,
    productsWithLowStock,
  })
}
