import { AppError } from '@helpers/app-error'

export class BookNotFound extends AppError {
  constructor() {
    super(404, 'Not Found', 'Book not found.')
  }
}
