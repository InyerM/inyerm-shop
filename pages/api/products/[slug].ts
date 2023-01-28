import type { NextApiRequest, NextApiResponse } from "next"
import { db, SHOP_CONSTANTS } from "../../../database"
import { Product } from "../../../models"
import { IProduct } from "../../../interfaces"

type Data = { message: string } | IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProduct(req, res)
    default:
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { slug } = req.query

    await db.connect()

    const product = await Product.findOne({ slug }).select("title images price inStock -_id").lean()

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    await db.disconnect()

    product.images = product.images.map((image: string) =>
      image.startsWith("https") ? image : `/products/${image}`,
    )

    res.status(200).json(product)
  } catch (error: any) {
    res.status(500).json({ message: error.message as string })
  }
}
