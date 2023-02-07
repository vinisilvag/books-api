import { type User } from '@domain/entities/user/user'
import { type UsersRepository } from '@application/repositories/users-repository'

import { prisma } from '../prisma'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await prisma.user.create({
      data: raw
    })
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await prisma.user.update({
      where: { id: raw.id },
      data: raw
    })
  }

  async delete(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await prisma.user.delete({
      where: { id: raw.id }
    })
  }
}
