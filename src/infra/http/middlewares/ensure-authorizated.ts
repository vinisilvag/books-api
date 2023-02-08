import { type Request, type Response, type NextFunction } from 'express'

import { InsufficientPermissions } from '@application/errors/sessions/insufficient-permissions'

import { UserRoles } from '@core/enums/user-roles'

export function ensureAuthorizated(role: UserRoles = UserRoles.ADMIN) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request

    if (user.role !== role) {
      throw new InsufficientPermissions()
    }

    next()
  }
}
