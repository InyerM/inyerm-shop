import type { NextApiRequest, NextApiResponse } from "next"
import { db, SHOP_CONSTANTS } from "../../../database"
import { Product } from "../../../models"
import { IProduct } from "../../../interfaces"

type Data = { message: string } | IProduct[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return await getProducts(req, res)
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { gender = "all" } = req.query
    let condition = {}

    if (gender !== "all" && SHOP_CONSTANTS.validGender.includes(`${gender}`)) {
      condition = { gender }
    }

    await db.connect()

    const products = await Product.find(condition)
      .select("title images price inStock slug -_id")
      .lean()

    const updatedProducts = products.map((product) => {
      product.images = product.images.map((image: string) =>
        image.startsWith("https") ? image : `/products/${image}`,
      )
      return product
    })

    await db.disconnect()

    res.status(200).json(updatedProducts)
  } catch (error: any) {
    res.status(500).json({ message: error.message as string })
  }
}
