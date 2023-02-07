import { type Book } from '@domain/entities/book/book'
import { type BooksRepository } from '@application/repositories/books-repository'

import { prisma } from '../prisma'

import { PrismaBookMapper } from '../mappers/prisma-book-mapper'

export class PrismaBooksRepository implements BooksRepository {
  async findById(id: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: { id }
    })

    if (!book) return null

    return PrismaBookMapper.toDomain(book)
  }

  async findBySlug(slug: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: { slug }
    })

    if (!book) return null

    return PrismaBookMapper.toDomain(book)
  }

  async findMany(): Promise<Book[]> {
    const books = await prisma.book.findMany()

    return books.map(book => PrismaBookMapper.toDomain(book))
  }

  async create(book: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(book)

    await prisma.book.create({
      data: raw
    })
  }

  async delete(book: Book): Promise<void> {
    const raw = PrismaBookMapper.toPrisma(book)

    await prisma.book.delete({
      where: { id: raw.id }
    })
  }
}
