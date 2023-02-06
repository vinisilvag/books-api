import { Book } from '@domain/entities/book/book'
import { Synopsis } from '@domain/entities/book/value-objects/synopsis'

import { type BooksRepository } from '@application/repositories/books-repository'

import { Slugify } from '@helpers/Slugify'

interface CreateBookRequest {
  title: string
  author: string
  cover: string
  publishingCompany: string
  publishingYear: number
  numberOfPages: number
  synopsis: string
}

interface CreateBookResponse {
  book: Book
}

export class CreateBook {
  constructor(private readonly booksRepository: BooksRepository) {}

  async execute(request: CreateBookRequest): Promise<CreateBookResponse> {
    const {
      title,
      author,
      cover,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis
    } = request

    const slug = Slugify(title)

    const bookExists = await this.booksRepository.findBySlug(slug)

    if (bookExists) {
      throw new Error('Book already exists.')
    }

    const book = new Book({
      title,
      slug,
      author,
      cover,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis: new Synopsis(synopsis)
    })

    await this.booksRepository.create(book)

    return { book }
  }
}
