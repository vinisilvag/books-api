import { type Book } from '@domain/entities/book/book'

import { type BooksRepository } from '@application/repositories/books-repository'

export class InMemoryBooksRepository implements BooksRepository {
  public books: Book[] = []

  async findById(id: string): Promise<Book | null> {
    const book = this.books.find(book => book.id === id)

    if (!book) return null

    return book
  }

  async findBySlug(slug: string): Promise<Book | null> {
    const book = this.books.find(book => book.props.slug === slug)

    if (!book) return null

    return book
  }

  async findMany(): Promise<Book[]> {
    return this.books
  }

  async create(book: Book): Promise<void> {
    this.books.push(book)
  }

  async delete(book: Book): Promise<void> {
    const booksLeft = this.books.filter(item => item.id !== book.id)

    this.books = booksLeft
  }
}
