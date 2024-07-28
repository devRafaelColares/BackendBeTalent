import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'secret_default'

export type TokenPayload = {
  id: number
  email: string
}

export default class JwtUtils {
  static sign(payload: TokenPayload): string {
    const { id, email } = payload
    return jwt.sign({ id, email }, secret, { expiresIn: '1h' })
  }

  static verify(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, secret) as TokenPayload
      return decoded
    } catch (error) {
      console.error('Token verification failed:', error)
      return null
    }
  }
}
