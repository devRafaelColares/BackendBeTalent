import type { HttpContext } from '@adonisjs/core/http'
import CustomerService from '#services/customer_service'
import { inputsCustomer } from '#validators/customer_validator'

export default class CustomersController {
  constructor(private customerService = new CustomerService()) {}

  async index({ response }: HttpContext) {
    const result = await this.customerService.listAll()
    return response.status(result.statusCode).json(result.data)
  }

  async show({ params, request, response }: HttpContext) {
    const { month, year } = request.qs()
    const result = await this.customerService.show(params.id, month, year)
    return response.status(result.statusCode).json(result.data)
  }

  async store({ request, response }: HttpContext) {
    await request.validateUsing(inputsCustomer)

    const { name, cpf } = request.all()
    const result = await this.customerService.create(name, cpf)
    return response.status(result.statusCode).json(result.data)
  }

  async update({ params, request, response }: HttpContext) {
    await request.validateUsing(inputsCustomer)

    const { name, cpf } = request.all()
    const result = await this.customerService.update(params.id, name, cpf)
    return response.status(result.statusCode).json(result.data)
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.customerService.delete(params.id)
    return response.status(result.statusCode).json(result.data)
  }
}
