import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type Book } from '@domain/entities/book/book'
import { type BooksRepository } from '@application/repositories/books-repository'

interface GetBooksResponse {
  books: Book[]
}

@Injectable()
export class GetBooks {
  constructor(
    @Inject('BooksRepository')
    private readonly booksRepository: BooksRepository
  ) {}

  async execute(): Promise<GetBooksResponse> {
    const books = await this.booksRepository.findMany()

    return { books }
  }
}
