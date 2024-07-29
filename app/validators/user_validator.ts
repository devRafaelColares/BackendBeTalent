import vine from '@vinejs/vine'

export const inputsUser = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
