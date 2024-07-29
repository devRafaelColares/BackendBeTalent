import type { HttpContext } from '@adonisjs/core/http'
import SaleService from '#services/sale_service'

export default class SaleController {
  constructor(private saleService = new SaleService()) {}

  async store({ request, response }: HttpContext) {
    const { clientId, productId, quantity, unitPrice, totalPrice, saleDate } = request.all()

    const result = await this.saleService.createSale({
      clientId,
      productId,
      quantity,
      unitPrice,
      totalPrice,
      saleDate,
    })

    return response.status(result.statusCode).json(result.data)
  }
}
