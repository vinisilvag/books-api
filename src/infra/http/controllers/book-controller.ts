import { container } from 'tsyringe'

import { type Request, type Response } from 'express'

import { GetBooks } from '@application/use-cases/books/get-books'
import { ShowBook } from '@application/use-cases/books/show-book'
import { CreateBook } from '@application/use-cases/books/create-book'
import { DeleteBook } from '@application/use-cases/books/delete-book'

import { showBookParams } from '../dtos/books/show-book-params'
import { createBookBody } from '../dtos/books/create-book-body'
import { deleteBookParams } from '../dtos/books/delete-book-params'

import { BookViewModel } from '../view-models/book-view-model'

export class BookController {
  async index(request: Request, response: Response): Promise<any> {
    const getBooks = container.resolve(GetBooks)
    const { books } = await getBooks.execute()

    return response
      .status(200)
      .json({ books: books.map(book => BookViewModel.toHTTP(book)) })
  }

  async show(request: Request, response: Response): Promise<any> {
    const { slug } = showBookParams.parse(request.params)

    const showBook = container.resolve(ShowBook)
    const { book } = await showBook.execute({ slug })

    return response.status(200).json({ book: BookViewModel.toHTTP(book) })
  }

  async create(request: Request, response: Response): Promise<any> {
    const {
      title,
      author,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis
    } = createBookBody.parse({
      ...request.body,
      publishingYear: Number(request.body.publishingYear),
      numberOfPages: Number(request.body.numberOfPages)
    })
    const cover = request.file?.filename || null

    const createBook = container.resolve(CreateBook)
    const { book } = await createBook.execute({
      title,
      author,
      cover,
      publishingCompany,
      publishingYear,
      numberOfPages,
      synopsis
    })

    return response.status(201).json({ book: BookViewModel.toHTTP(book) })
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { bookId } = deleteBookParams.parse(request.params)

    const deleteBook = container.resolve(DeleteBook)
    const { book } = await deleteBook.execute({
      bookId
    })

    return response.status(200).json({ book: BookViewModel.toHTTP(book) })
  }
}
