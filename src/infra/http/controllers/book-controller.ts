import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { GetBooks } from '@application/use-cases/books/get-books'
import { ShowBook } from '@application/use-cases/books/show-book'

import { showBookParams } from '../dtos/books/show-book-params'
import { createBookBody } from '../dtos/books/create-book-body'

import { BookViewModel } from '../view-models/book-view-model'
import { CreateBook } from '@application/use-cases/books/create-book'

export class BookController {
  async index(request: FastifyRequest): Promise<any> {
    const getBooks = container.resolve(GetBooks)
    const { books } = await getBooks.execute()

    return { books: books.map(book => BookViewModel.toHTTP(book)) }
  }

  async show(request: FastifyRequest): Promise<any> {
    const { slug } = showBookParams.parse(request.params)

    const showBook = container.resolve(ShowBook)
    const { book } = await showBook.execute({ slug })

    return { book: BookViewModel.toHTTP(book) }
  }

  // fix create error
  async create(request: FastifyRequest): Promise<any> {
    const {
      title,
      author,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis
    } = createBookBody.parse(request.body)
    const cover = request.file.filename

    const createBook = container.resolve(CreateBook)
    const { book } = await createBook.execute({
      title,
      author,
      cover: cover || null,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis
    })

    return { book: BookViewModel.toHTTP(book) }
  }
}
