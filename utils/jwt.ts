import jwt from 'jsonwebtoken'

export const generateToken = (_id: string, email: string) => {
  if ( !process.env.JWT_SECRET ) {
    throw new Error(`There isn't jwt secret`)
  }

  const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '30d' })

  return token
}

export const verifyToken = (token: string): Promise<string> => {
  if ( !process.env.JWT_SECRET ) {
    throw new Error(`There isn't jwt secret`)
  }

  if( token.length <= 10 ){
    return Promise.reject('Token is not valid')
  }

  return new Promise(
    (resolve, reject) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
          if (err) return reject('JWT is not valid')
          const { _id, email } = payload as { _id: string, email: string }

          resolve(_id)
        })
      } catch (error) {
        reject('JWT is not valid')
      }
    }
  )
}