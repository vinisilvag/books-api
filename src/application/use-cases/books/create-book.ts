import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { Book } from '@domain/entities/book/book'
import { Synopsis } from '@domain/entities/book/value-objects/synopsis'

import { type BooksRepository } from '@application/repositories/books-repository'

import { BookAlreadyExists } from '@application/errors/books/book-already-exists'

import { Slugify } from '@helpers/slugify'

interface CreateBookRequest {
  title: string
  author: string
  cover: string | null
  publishingCompany: string
  publishingYear: number
  numberOfPages: number
  synopsis: string
}

interface CreateBookResponse {
  book: Book
}

@Injectable()
export class CreateBook {
  constructor(
    @Inject('BooksRepository')
    private readonly booksRepository: BooksRepository
  ) {}

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
      throw new BookAlreadyExists()
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
