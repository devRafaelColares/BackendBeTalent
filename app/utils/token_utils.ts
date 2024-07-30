import { HttpContext } from '@adonisjs/core/http'

/**
 * @param ctx
 * @returns
 */
export function extractToken(ctx: HttpContext): string | undefined {
  const header = ctx.request.headers().authorization
  if (!header) {
    return undefined
  }
  const token = header.split(' ')[1]
  return token
}
