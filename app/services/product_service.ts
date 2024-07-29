import Product from '#models/product'
import { DateTime } from 'luxon'

export default class ProductService {
  async getAllProducts() {
    try {
      const products = await Product.query().whereNull('deletedAt').orderBy('name')
      return { statusCode: 200, data: products }
    } catch (error) {
      console.error('Error fetching all products:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }

  async getProductById(id: number) {
    try {
      const product = await Product.query().where('id', id).whereNull('deletedAt').first()

      if (!product) {
        return { statusCode: 404, data: { message: 'Product not found' } }
      }

      return { statusCode: 200, data: product }
    } catch (error) {
      console.error('Error fetching product by ID:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }

  async createProduct(data: {
    name: string
    price: number
    liters: number
    manufactureDate: string
    expiryDate: string
  }) {
    try {
      const productData = {
        ...data,
        manufactureDate: DateTime.fromFormat(data.manufactureDate, 'yyyy-MM-dd').toUTC(),
        expiryDate: DateTime.fromFormat(data.expiryDate, 'yyyy-MM-dd').toUTC(),
      }

      const product = await Product.create(productData)
      return { statusCode: 201, data: product }
    } catch (error) {
      console.error('Error creating product:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }

  async updateProduct(
    id: number,
    data: {
      name?: string
      price?: number
      liters?: number
      manufactureDate?: string
      expiryDate?: string
    }
  ) {
    try {
      const product = await Product.find(id)

      if (!product || product.deletedAt) {
        return { statusCode: 404, data: { message: 'Product not found' } }
      }

      const productData = {
        ...data,
        manufactureDate: data.manufactureDate
          ? DateTime.fromFormat(data.manufactureDate, 'yyyy-MM-dd').toUTC()
          : product.manufactureDate,
        expiryDate: data.expiryDate
          ? DateTime.fromFormat(data.expiryDate, 'yyyy-MM-dd').toUTC()
          : product.expiryDate,
      }

      product.merge(productData)
      await product.save()

      return { statusCode: 200, data: product }
    } catch (error) {
      console.error('Error updating product:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }

  async deleteProduct(id: number) {
    try {
      const product = await Product.find(id)

      if (!product || product.deletedAt) {
        return { statusCode: 404, data: { message: 'Product not found' } }
      }

      product.deletedAt = DateTime.now().toUTC()
      await product.save()

      return { statusCode: 204, data: null }
    } catch (error) {
      console.error('Error deleting product:', error)
      return { statusCode: 500, data: { message: 'Internal Server Error' } }
    }
  }
}
