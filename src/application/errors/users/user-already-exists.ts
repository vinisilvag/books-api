import { AppError } from '@helpers/app-error'

export class UserAlreadyExists extends AppError {
  constructor() {
    super(400, 'Already Exists', 'User already exists.')
  }
}
