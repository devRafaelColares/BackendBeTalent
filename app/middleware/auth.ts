import type { HttpContext } from '@adonisjs/core/http'
import JwtUtils from '../utils/jwt_utils.js'

export default class Auth {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    try {
      const authHeader = request.header('Authorization')
      if (!authHeader) {
        return response.status(401).json({ message: 'Authorization header is missing' })
      }

      const token = authHeader.replace('Bearer ', '')
      const decoded = JwtUtils.verify(token)

      if (!decoded) {
        return response.status(401).json({ message: 'Invalid or expired token' })
      }

      ;(request.all as any) = decoded
      await next()
    } catch (error) {
      return response.status(401).json({ message: 'Authentication failed', error })
    }
  }
}
