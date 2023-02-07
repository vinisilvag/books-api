import { InsufficientPermissions } from '@application/errors/sessions/insufficient-permissions'
import { type Request, type Response, type NextFunction } from 'express'

export async function ensureAuthorizated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { user } = request

  if (!user.admin) {
    throw new InsufficientPermissions()
  }

  next()
}
