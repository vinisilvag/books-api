import { type Book } from '@domain/entities/book/book'
import { type BooksRepository } from '@application/repositories/books-repository'

interface ShowBookRequest {
  slug: string
}

interface ShowBookResponse {
  book: Book
}

export class ShowBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: ShowBookRequest): Promise<ShowBookResponse> {
    const { slug } = request

    const book = await this.booksRepository.findBySlug(slug)

    if (!book) {
      throw new Error('Book not found.')
    }

    return { book }
  }
}
