import { isValidObjectId } from "mongoose"
import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { IProduct } from "../../../interfaces"
import { Product } from "../../../models"

type Data = { message: string } | IProduct[] | IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProducts(req, res)
    case "POST":
      return createProduct(req, res)
    case "PUT":
      return updateProduct(req, res)
    default:
      return res.status(405).json({ message: "Method not allowed" })
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect()
  const products = await Product.find({}).sort({ title: "asc" }).lean()
  await db.disconnect()

  return res.status(200).json(products)
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { images = [] } = req.body as IProduct
  if (images.length < 2) return res.status(400).json({ message: "Please upload at least 2 images" })

  try {
    await db.connect()
    const productInDb = await Product.findOne({ slug: req.body.slug })
    if (productInDb)
      return res.status(400).json({ message: "Product with that slug already exists" })
    const product = await Product.create(req.body)
    await db.disconnect()

    return res.status(201).json(product)
  } catch (error) {
    await db.disconnect()
    return res.status(500).json({ message: "Something went wrong" })
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { _id = "", images = [] } = req.body as IProduct
  if (!isValidObjectId(_id)) return res.status(400).json({ message: "Invalid product id" })
  if (images.length < 2) return res.status(400).json({ message: "Please upload at least 2 images" })

  try {
    await db.connect()
    const product = await Product.findById(_id)
    if (!product) {
      await db.disconnect()
      return res.status(404).json({ message: "Product not found" })
    }
    await product.updateOne(req.body)
    await db.disconnect()

    return res.status(200).json(product)
  } catch (error) {
    await db.disconnect()
    return res.status(500).json({ message: "Something went wrong" })
  }
}
