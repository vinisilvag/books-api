import { Book } from '@domain/entities/book/book'

import { Synopsis } from '@domain/entities/book/value-objects/synopsis'

import { type Book as RawBook } from '@prisma/client'

export class PrismaBookMapper {
  static toPrisma(book: Book): RawBook {
    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      cover: book.cover,
      publishingCompany: book.publishingCompany,
      publishingYear: book.publishingYear,
      numberOfPages: book.numberOfPages,
      synopsis: book.synopsis.value,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }
  }

  static toDomain(raw: RawBook): Book {
    return new Book(
      {
        title: raw.title,
        slug: raw.slug,
        author: raw.author,
        cover: raw.cover,
        publishingCompany: raw.publishingCompany,
        publishingYear: raw.publishingYear,
        numberOfPages: raw.numberOfPages,
        synopsis: new Synopsis(raw.synopsis),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.id
    )
  }
}
