import vine from '@vinejs/vine'

export const saleValidator = vine.object({
  clientId: vine.number().positive(),
  productId: vine.number().positive(),
  quantity: vine.number().positive(),
  unitPrice: vine.number().positive(),
  totalPrice: vine.number().positive(),
  saleDate: vine.date(),
})
