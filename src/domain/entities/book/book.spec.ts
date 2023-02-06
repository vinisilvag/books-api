import { describe, it, expect } from 'vitest'

import { Book } from './book'
import { Synopsis } from './value-objects/synopsis'

import { faker } from '@faker-js/faker'

describe('Book', () => {
  it('should be able to create a book', () => {
    const book = new Book({
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
      synopsis: new Synopsis(faker.lorem.paragraph())
    })

    expect(book).toBeTruthy()
  })
})
