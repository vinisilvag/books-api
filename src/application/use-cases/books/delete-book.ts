import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type Book } from '@domain/entities/book/book'

import { type BooksRepository } from '@application/repositories/books-repository'

import { BookNotFound } from '@application/errors/books/book-not-found'

interface DeleteBookRequest {
  bookId: string
}

interface DeleteBookResponse {
  book: Book
}

@Injectable()
export class DeleteBook {
  constructor(
    @Inject('BooksRepository')
    private readonly booksRepository: BooksRepository
  ) {}

  async execute(request: DeleteBookRequest): Promise<DeleteBookResponse> {
    const { bookId } = request

    const book = await this.booksRepository.findById(bookId)

    if (!book) {
      throw new BookNotFound()
    }

    await this.booksRepository.delete(book)

    return { book }
  }
}
