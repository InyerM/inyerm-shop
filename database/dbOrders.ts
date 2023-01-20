import { isValidObjectId } from "mongoose"
import { db } from "."
import { IOrder } from "../interfaces"
import { Order } from "../models"

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) return null
  await db.connect()
  const order = await Order.findById(id).lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(order)) || null
}

export const getOrderByUser = async (_id: string): Promise<IOrder[]> => {
  if (!isValidObjectId(_id)) return []

  await db.connect()
  const orders = await Order.find({ user: _id }).lean()
  await db.disconnect()

  return JSON.parse(JSON.stringify(orders)) || []
}
