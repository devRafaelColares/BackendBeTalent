import Customer from '#models/client'
import Sale from '#models/sale'

export default class CustomerService {
  async listAll() {
    const customers = await Customer.query().orderBy('id', 'asc')
    return { statusCode: 200, data: customers }
  }

  async show(id: number, month?: number, year?: number) {
    const customer = await Customer.query().where('id', id).first()
    if (!customer) {
      return { statusCode: 404, data: { message: 'Customer not found' } }
    }

    let salesQuery = Sale.query().where('client_id', id).orderBy('sale_date', 'desc')
    if (month && year) {
      salesQuery = salesQuery
        .whereRaw('MONTH(sale_date) = ?', [month])
        .whereRaw('YEAR(sale_date) = ?', [year])
    }

    const sales = await salesQuery.exec()
    return { statusCode: 200, data: { customer, sales } }
  }

  async create(name: string, cpf: string) {
    const existingCustomer = await Customer.query().where('cpf', cpf).first()
    if (existingCustomer) {
      return { statusCode: 400, data: { message: 'Customer already exists' } }
    }

    const newCustomer = await Customer.create({ name, cpf })
    return { statusCode: 201, data: newCustomer }
  }

  async update(id: number, name: string, cpf: string) {
    const customer = await Customer.find(id)
    if (!customer) {
      return { statusCode: 404, data: { message: 'Customer not found' } }
    }

    customer.name = name
    customer.cpf = cpf
    await customer.save()

    return { statusCode: 200, data: customer }
  }

  async delete(id: number) {
    const customer = await Customer.find(id)
    if (!customer) {
      return { statusCode: 404, data: { message: 'Customer not found' } }
    }

    await customer.delete()
    await Sale.query().where('client_id', id).delete()

    return { statusCode: 200, data: { message: 'Customer and their sales deleted' } }
  }
}
