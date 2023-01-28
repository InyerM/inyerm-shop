import { db } from "."
import { Product } from "../models"
import { IProduct } from "../interfaces"

interface ProductSlug {
  slug: string
}

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
  try {
    await db.connect()

    const product = await Product.findOne({ slug })
      .select("images price slug title gender sizes description inStock type tags")
      .lean()

    if (!product) {
      return null
    }

    await db.disconnect()

    product.images = product.images.map((image: string) =>
      image.startsWith("https") ? image : `/products/${image}`,
    )

    return JSON.parse(JSON.stringify(product))
  } catch (error: any) {
    return null
  }
}

export const getAllProductsSlug = async (): Promise<ProductSlug[]> => {
  await db.connect()
  const slugs = await Product.find().select("slug -_id").lean()
  await db.disconnect()

  return slugs
}

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
  term = term.toString().toLowerCase()

  await db.connect()

  const products = await Product.find({ $text: { $search: term } })
    .select("title images price inStock slug -_id")
    .lean()

  await db.disconnect()

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image: string) =>
      image.startsWith("https") ? image : `/products/${image}`,
    )
    return product
  })

  return updatedProducts
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  await db.connect()

  const products = await Product.find({}).select("title images price inStock slug -_id").lean()

  await db.disconnect()

  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image: string) =>
      image.startsWith("https") ? image : `/products/${image}`,
    )
    return product
  })

  return JSON.parse(JSON.stringify(updatedProducts))
}
