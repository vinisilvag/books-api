import { describe, it, expect } from 'vitest'

import { ShowBook } from './show-book'
import { InMemoryBooksRepository } from '@tests/repositories/in-memory-books-repository'

import { makeBook } from '@tests/factories/book-factory'

describe('Show Book', () => {
  it('should be able show a book based on the book slug', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const showBook = new ShowBook(booksRepository)

    await booksRepository.create(
      makeBook({
        slug: 'fake-slug'
      })
    )

    const { book } = await showBook.execute({ slug: 'fake-slug' })

    expect(book).toBeTruthy()
  })

  it('should not be able show a book with an non existing slug', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const showBook = new ShowBook(booksRepository)

    await booksRepository.create(
      makeBook({
        slug: 'fake-slug'
      })
    )

    await expect(showBook.execute({ slug: 'fake-slug-test' })).rejects.toThrow()
  })
})
