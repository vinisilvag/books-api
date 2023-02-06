import { type Book } from '@domain/entities/book/book'

export abstract class BooksRepository {
  abstract findById(id: string): Promise<Book | null>
  abstract findBySlug(slug: string): Promise<Book | null>
  abstract findMany(): Promise<Book[]>
  abstract create(book: Book): Promise<void>
}
