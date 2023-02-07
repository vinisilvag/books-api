import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { GetBooks } from '@application/use-cases/books/get-books'

export class BookController {
  async index(request: FastifyRequest): Promise<any> {
    const getBooks = container.resolve(GetBooks)
    const { books } = await getBooks.execute()

    return { books }
  }
}
