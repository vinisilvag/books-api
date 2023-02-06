import { describe, it, expect } from 'vitest'

import { GetBooks } from './get-books'
import { InMemoryBooksRepository } from '@tests/repositories/in-memory-books-repository'

import { makeBook } from '@tests/factories/book-factory'

describe('Get books', () => {
  it('should be able get a list with the current registered books', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const getBooks = new GetBooks(booksRepository)

    await booksRepository.create(makeBook())
    await booksRepository.create(makeBook())
    await booksRepository.create(makeBook())

    const { books } = await getBooks.execute()

    expect(books).toBeTruthy()
    expect(books).toHaveLength(3)
  })
})
