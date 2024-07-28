import User from '#models/user'
import bcrypt from 'bcrypt'
import JwtUtils from '../utils/jwt_utils.js'

export default class UserService {
  async signup(email: string, password: string) {
    if (!email || !password) {
      return { statusCode: 400, data: { message: 'All fields must be filled' } }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { statusCode: 400, data: { message: 'Invalid email format' } }
    }

    if (password.length < 6) {
      return { statusCode: 400, data: { message: 'Password too short' } }
    }

    // Check if user already exists
    const existingUser = await User.query().where('email', email).first()
    if (existingUser) {
      return { statusCode: 400, data: { message: 'Email already in use' } }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
    })

    return { statusCode: 201, data: { id: newUser.id, email: newUser.email } }
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return { statusCode: 400, data: { message: 'All fields must be filled' } }
    }

    // Find the user by email
    const user = await User.query().where('email', email).first()
    if (!user) {
      return { statusCode: 401, data: { message: 'Invalid email or password' } }
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { statusCode: 401, data: { message: 'Invalid email or password' } }
    }

    // Generate JWT token
    const token = JwtUtils.sign({ id: user.id, email: user.email })

    return { statusCode: 200, data: { token } }
  }
}
