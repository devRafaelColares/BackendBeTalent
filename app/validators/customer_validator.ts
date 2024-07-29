import vine from '@vinejs/vine'

export const inputsCustomer = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    cpf: vine.string().trim().minLength(11).maxLength(11),
  })
)
