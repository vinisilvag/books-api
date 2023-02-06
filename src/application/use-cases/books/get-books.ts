import { type Book } from '@domain/entities/book/book'
import { type BooksRepository } from '@application/repositories/books-repository'

interface GetBooksResponse {
  books: Book[]
}

export class GetBooks {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(): Promise<GetBooksResponse> {
    const books = await this.booksRepository.findMany()

    return { books }
  }
}
