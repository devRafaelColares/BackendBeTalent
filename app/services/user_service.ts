import User from '#models/user'
import bcrypt from 'bcrypt'
import JwtUtils from '../utils/jwt_utils.js'

export default class UserService {
  async signup(email: string, password: string) {
    const existingUser = await User.query().where('email', email).first()
    if (existingUser) {
      return { statusCode: 400, data: { message: 'Email already in use' } }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hashedPassword,
    })

    return { statusCode: 201, data: { id: newUser.id, email: newUser.email } }
  }

  async login(email: string, password: string) {
    const user = await User.query().where('email', email).first()
    if (!user) {
      return { statusCode: 401, data: { message: 'Invalid email or password' } }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { statusCode: 401, data: { message: 'Invalid email or password' } }
    }

    const token = JwtUtils.sign({ id: user.id, email: user.email })

    return { statusCode: 200, data: { token } }
  }
}
