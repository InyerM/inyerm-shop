import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = { message: string } | IProduct []

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return await searchProducts(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const searchProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    let { q = '' } = req.query

    if ( q.length === 0 ) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    q = q.toString().toLowerCase()

    await db.connect()

    const products = await Product.find({ $text: { $search: q } })
      .select('title images price inStock slug -_id')
      .lean()

    await db.disconnect()

    res.status(200).json( products )
  } catch (error: any) {
    res.status(500).json({ message: error.message as string })
  }
}