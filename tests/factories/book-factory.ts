import { Book, type BookProps } from '@domain/entities/book/book'

import { Synopsis } from '@domain/entities/book/value-objects/synopsis'

import { faker } from '@faker-js/faker'

type Override = Partial<BookProps>

export function makeBook(override: Override = {}): Book {
  return new Book({
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
    synopsis: new Synopsis(faker.lorem.paragraph()),
    ...override
  })
}
