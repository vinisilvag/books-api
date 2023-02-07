import { describe, it, expect } from 'vitest'

import { CreateBook } from './create-book'
import { DeleteBook } from './delete-book'

import { InMemoryBooksRepository } from '@tests/repositories/in-memory-books-repository'

import { makeBook } from '@tests/factories/book-factory'
import { faker } from '@faker-js/faker'

describe('Delete Book', () => {
  it('should be able to delete a book', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const deleteBook = new DeleteBook(booksRepository)

    const book = makeBook()
    await booksRepository.create(book)

    const { book: deletedBook } = await deleteBook.execute({ bookId: book.id })

    expect(deletedBook).toBeTruthy()
    expect(booksRepository.books).toHaveLength(0)
    expect(book).toEqual(deletedBook)
  })

  it('should not be able to delete a book that does not exist', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const deleteBook = new DeleteBook(booksRepository)

    await expect(
      deleteBook.execute({
        bookId: 'fake-book-id'
      })
    ).rejects.toThrow()
  })
})
