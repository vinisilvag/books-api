import { AppError } from '@helpers/app-error'

export class InsufficientPermissions extends AppError {
  constructor() {
    super(
      403,
      'Insufficient Permission',
      'You are not allowed to execute that.'
    )
  }
}
