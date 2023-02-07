import { type User } from '@domain/entities/user/user'
import { type UsersRepository } from '@application/repositories/users-repository'

import { prisma } from '../prisma'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUsersRepository implements UsersRepository {
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
}
