import { describe, it, expect } from 'vitest'

import { CreateBook } from './create-book'

import { InMemoryBooksRepository } from '@tests/repositories/in-memory-books-repository'

import { faker } from '@faker-js/faker'
import { makeBook } from '@tests/factories/book-factory'

describe('Create book', () => {
  it('should be able to create a book', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const createBook = new CreateBook(booksRepository)

    const { book } = await createBook.execute({
      title: faker.lorem.words(5),
      author: faker.name.fullName(),
      cover: faker.internet.avatar(),
      publishingCompany: faker.company.name(),
      publishingYear: faker.datatype.number({
        min: 1900,
        max: 2023
      }),
      numberOfPages: faker.datatype.number({
        min: 1,
        max: 1000
      }),
      synopsis: faker.lorem.paragraph()
    })

    expect(book).toBeTruthy()
    expect(booksRepository.books).toHaveLength(1)
    expect(booksRepository.books[0]).toEqual(book)
  })

  it('should not be able to create a book with an existing slug (title)', async () => {
    const booksRepository = new InMemoryBooksRepository()
    const createBook = new CreateBook(booksRepository)

    await booksRepository.create(
      makeBook({
        title: 'Book Fake Title'
      })
    )

    await expect(
      createBook.execute({
        title: 'Book Fake Title',
        author: faker.name.fullName(),
        cover: faker.internet.avatar(),
        publishingCompany: faker.company.name(),
        publishingYear: faker.datatype.number({
          min: 1900,
          max: 2023
        }),
        numberOfPages: faker.datatype.number({
          min: 1,
          max: 1000
        }),
        synopsis: faker.lorem.paragraph()
      })
    ).rejects.toThrow()
  })
})
