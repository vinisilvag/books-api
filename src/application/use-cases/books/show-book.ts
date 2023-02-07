import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type Book } from '@domain/entities/book/book'
import { type BooksRepository } from '@application/repositories/books-repository'

import { BookNotFound } from '@application/errors/books/book-not-found'

interface ShowBookRequest {
  slug: string
}

interface ShowBookResponse {
  book: Book
}

@Injectable()
export class ShowBook {
  constructor(
    @Inject('BooksRepository')
    private readonly booksRepository: BooksRepository
  ) {}

  async execute(request: ShowBookRequest): Promise<ShowBookResponse> {
    const { slug } = request

    const book = await this.booksRepository.findBySlug(slug)

    if (!book) {
      throw new BookNotFound()
    }

    return { book }
  }
}
