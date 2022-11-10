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
    case 'GET':
      return checkJWT(req, res)
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
      break
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { token = '' } = req.cookies

    if (!token) return res.status(401).json({ message: 'You are not logged in' })

    let userId = ''

    try {
      userId = await jwt.verifyToken( token.toString() )
    } catch (error) {
      return res.status(401).json({ message: 'Missing or invalid token' })
    }

    await db.connect()

    const user = await User.findById( userId ).lean()

    await db.disconnect()

    if (!user) return res.status(401).json({ message: 'User does not exist' })

    const { email, _id, role, name } = user

    return res.status(200).json({ 
      message: 'You are logged in',
      token: jwt.generateToken(_id, email),
      user: { email, role, name },
    })
    
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
