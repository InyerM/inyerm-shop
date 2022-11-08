import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDb } from '../../database'
import { Product } from '../../models'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if(process.env.NODE_ENV === 'production') return res.status(401).json({ message: 'Not allowed' })
  try {
    await db.connect()

    await Product.deleteMany()

    await Product.insertMany(seedDb.initialData.products)

    await db.disconnect()
    res.status(200).json({ message: 'Successfully' })
  } catch (error: any) {
    res.status(500).json({ message: error.message as string })
  }
}