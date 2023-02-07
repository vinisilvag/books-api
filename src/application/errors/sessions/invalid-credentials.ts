import { AppError } from '@helpers/app-error'

export class InvalidCredentials extends AppError {
  constructor() {
    super(401, 'Invalid Credentials', 'Invalid email/password combination.')
  }
}
