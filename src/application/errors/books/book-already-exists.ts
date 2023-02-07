import { AppError } from '@helpers/app-error'

export class BookAlreadyExists extends AppError {
  constructor() {
    super(400, 'Already Exists', 'Book already exists.')
  }
}
