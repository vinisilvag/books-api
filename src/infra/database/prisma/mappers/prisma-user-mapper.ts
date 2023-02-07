import { User } from '@domain/entities/user/user'

import { Email } from '@domain/entities/user/value-objects/email'

import { type User as RawUser } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: new Email(raw.email),
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.id
    )
  }
}
