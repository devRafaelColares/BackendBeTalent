import Sale from '#models/sale'
import { DateTime } from 'luxon'

export default class SaleService {
  async createSale(data: {
    clientId: number
    productId: number
    quantity: number
    unitPrice: number
    totalPrice: number
    saleDate: string
  }) {
    try {
      if (
        data.clientId <= 0 ||
        data.productId <= 0 ||
        data.quantity <= 0 ||
        data.unitPrice <= 0 ||
        data.totalPrice <= 0
      ) {
        return { statusCode: 400, data: { message: 'All numeric fields must be positive.' } }
      }

      const saleDate = DateTime.fromFormat(data.saleDate, 'yyyy-MM-dd', { zone: 'utc' })
      if (!saleDate.isValid) {
        return { statusCode: 400, data: { message: 'Invalid date format. Use yyyy-MM-dd.' } }
      }

      const saleData = {
        ...data,
        saleDate: saleDate.toUTC(),
      }

      const sale = await Sale.create(saleData)
      return { statusCode: 201, data: sale }
    } catch (error) {
      console.error('Error creating sale:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }
}
