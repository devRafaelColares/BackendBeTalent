import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'

export default class UsersController {
  constructor(private userService = new UserService()) {}

  async signup({ request, response }: HttpContext) {
    const { email, password } = request.body()
    const result = await this.userService.signup(email, password)
    return response.status(result.statusCode).json(result.data)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.body()
    const result = await this.userService.login(email, password)
    return response.status(result.statusCode).json(result.data)
  }
}
