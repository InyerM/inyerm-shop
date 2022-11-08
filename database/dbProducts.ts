import { db } from "."
import { Product } from "../models"
import { IProduct } from '../interfaces'

interface ProductSlug {
  slug: string
}

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  try {

    await db.connect()

    const product = await Product.findOne({ slug })
      .select('-_id')
      .lean()

    if (!product) {
      return null
    }

    await db.disconnect()

    return JSON.parse(JSON.stringify(product))
  } catch (error: any) {
    return null
  }
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {
  await db.connect()
  const slugs = await Product.find().select('slug -_id').lean()
  await db.disconnect()

  return slugs
}

export const getProductsByTerm = async ( term: string ): Promise<IProduct[]> => {
  term = term.toString().toLowerCase()

  await db.connect()

  const products = await Product.find({ $text: { $search: term } })
    .select('title images price inStock slug -_id')
    .lean()

  await db.disconnect()

  return products
}

export const getAllProducts = async (): Promise<IProduct[]> => {

  await db.connect()

  const products = await Product.find({})
    .select('title images price inStock slug -_id')
    .lean()

  await db.disconnect()

  return JSON.parse(JSON.stringify(products))
}
