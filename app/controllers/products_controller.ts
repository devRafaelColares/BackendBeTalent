import type { HttpContext } from '@adonisjs/core/http'
import ProductService from '#services/product_service'
import { inputsProduct } from '#validators/product_validator'

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  async index({ response }: HttpContext) {
    const result = await this.productService.getAllProducts()
    return response.status(result.statusCode).json(result.data)
  }

  async show({ params, response }: HttpContext) {
    const result = await this.productService.getProductById(params.id)
    return response.status(result.statusCode).json(result.data)
  }

  async store({ request, response }: HttpContext) {
    await request.validateUsing(inputsProduct)
    const data = request.only(['name', 'price', 'liters', 'manufactureDate', 'expiryDate'])
    const result = await this.productService.createProduct(data)
    return response.status(result.statusCode).json(result.data)
  }

  async update({ params, request, response }: HttpContext) {
    await request.validateUsing(inputsProduct)
    const data = request.only(['name', 'price', 'liters', 'manufactureDate', 'expiryDate'])
    const result = await this.productService.updateProduct(params.id, data)
    return response.status(result.statusCode).json(result.data)
  }

  async delete({ params, response }: HttpContext) {
    const result = await this.productService.deleteProduct(params.id)
    return response.status(result.statusCode).json(result.data)
  }
}
