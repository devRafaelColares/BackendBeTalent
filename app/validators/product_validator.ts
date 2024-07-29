import vine from '@vinejs/vine'

export const inputsProduct = vine.compile(
  vine.object({
    name: vine.string().minLength(1),
    price: vine.number().positive(),
    liters: vine.number().positive(),
    manufactureDate: vine.date(),
    expiryDate: vine.date(),
  })
)
