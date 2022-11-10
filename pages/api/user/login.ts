import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { db } from '../../../database'
import { User } from '../../../models'
import { jwt } from '../../../utils'
import { IAuthResponse } from '../../../interfaces'

type Data = 
| { message: string }
| IAuthResponse

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return loginUser(req, res)
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
      break
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '' } = req.body

    await db.connect()

    const user = await User.findOne({ email }).lean()

    await db.disconnect()

    if (!user) return res.status(401).json({ message: 'You have bad credentials - Email' })

    const passwordsMatch = bcrypt.compareSync(password, user.password!)
    if (!passwordsMatch) return res.status(401).json({ message: 'You have bad credentials - Password' })

    const { role, name, _id } = user

    const token = jwt.generateToken(_id, email)

    return res.status(200).json({ 
      message: 'You are logged in',
      user: { email, role, name },
      token, 
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
