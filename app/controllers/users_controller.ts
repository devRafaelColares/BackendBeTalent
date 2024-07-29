import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import { inputsUser } from '#validators/user_validator'

export default class UsersController {
  constructor(private userService = new UserService()) {}

  async signup({ request, response }: HttpContext) {
    await request.validateUsing(inputsUser)

    const { email, password } = request.all()

    const result = await this.userService.signup(email, password)
    return response.status(result.statusCode).json(result.data)
  }

  async login({ request, response }: HttpContext) {
    await request.validateUsing(inputsUser)

    const { email, password } = request.all()

    const result = await this.userService.login(email, password)
    return response.status(result.statusCode).json(result.data)
  }
}
