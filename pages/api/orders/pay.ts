import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { db } from "../../../database"
import { IPaypal } from "../../../interfaces"
import { Order } from "../../../models"

type Data = {
  message: string
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res)
    default:
      return res.status(400).json({ message: "Bad request" })
  }
}

async function getPaypalBearerToken(): Promise<string | null> {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const paypalSecret = process.env.PAYPAL_SECRET
  const oauthUrl = process.env.PAYPAL_OAUTH_URL

  if (!paypalClientId || !paypalSecret) return null

  const credentials = Buffer.from(`${paypalClientId}:${paypalSecret}`, "utf-8").toString("base64")
  const body = new URLSearchParams({
    grant_type: "client_credentials",
  })

  try {
    const { data } = await axios.post(oauthUrl || "", body, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    return data.access_token as string
  } catch (error) {
    console.error(error)
    return null
  }
}

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getSession({ req })
  if (!session) return res.status(401).json({ message: "Unauthorized" })

  const paypalBearerToken = await getPaypalBearerToken()
  if (!paypalBearerToken) return res.status(500).json({ message: "Paypal token not found" })
  const { transactionId = "", orderId = "" } = req.body

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    },
  )

  if (data.status !== "COMPLETED") return res.status(400).json({ message: "Order not completed" })
  await db.connect()
  const dbOrder = await Order.findById(orderId)
  if (!dbOrder) {
    await db.disconnect()
    return res.status(404).json({ message: "Order not found" })
  }

  if (dbOrder.total !== +data.purchase_units[0].amount.value) {
    await db.disconnect()
    return res.status(400).json({ message: "Order total not valid" })
  }

  dbOrder.transactionId = transactionId
  dbOrder.isPaid = true
  dbOrder.paidAt = new Date()

  await dbOrder.save()
  await db.disconnect()

  return res.status(200).json({ message: "Order paid" })
}
