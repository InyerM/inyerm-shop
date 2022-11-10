import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { db } from '../../../database'
import { User } from '../../../models'
import { jwt, validations } from '../../../utils'
import { IAuthResponse, IAuthUser } from '../../../interfaces'

type Data = 
| { message: string }
| IAuthResponse

interface IValidateUser extends Omit<IAuthUser, 'role'> {
  password: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res)
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
      break
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { email = '', password = '', name = '' } = req.body as IValidateUser

    validateUserCredentials({ email, name, password }, res)
    
    await db.connect()

    const user = await User.findOne({ email }).lean()
    
    if (user) {
      await db.disconnect()
      return res.status(401).json({ message: 'User already exists' })
    }

    const newUser = new User({
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10),
      name,
      role: 'client',
    })

    await newUser.save({ validateBeforeSave: true })

    await db.disconnect()

    const { _id } = newUser

    const token = jwt.generateToken(_id, email)

    return res.status(200).json({ 
      message: 'You are logged in',
      user: { 
        email,
        role: 'client', 
        name,
      },
      token, 
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

const validateUserCredentials = ({ email, name, password = ''}: IValidateUser, res: NextApiResponse<Data>) => {
  if (password.length < 6) return res.status(401).json({ message: 'Password must have at least 6 characters' })
    
  if (name.length < 2) return res.status(401).json({ message: 'Name must have at least 2 characters' })

  if(!validations.isValidEmail(email)) return res.status(401).json({ message: 'It looks like your email is incorrect' })
}
