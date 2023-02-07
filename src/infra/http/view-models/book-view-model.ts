import { type Book } from '@domain/entities/book/book'

interface HTTPBook {
  id: string
  title: string
  slug: string
  author: string
  cover: string
  publishingCompany: string
  publishingYear: number
  numberOfPages: number
  synopsis: string
  createdAt: Date
  updatedAt: Date
}

export class BookViewModel {
  static toHTTP(book: Book): HTTPBook {
    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      cover: `http://localhost:3333/uploads/cover/${book.cover}`,
      publishingCompany: book.publishingCompany,
      publishingYear: book.publishingYear,
      numberOfPages: book.numberOfPages,
      synopsis: book.synopsis.value,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt
    }
  }
}
