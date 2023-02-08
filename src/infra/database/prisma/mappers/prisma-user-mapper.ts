import { User } from '@domain/entities/user/user'

import { Email } from '@domain/entities/user/value-objects/email'

import { type User as RawUser } from '@prisma/client'

import { UserRoles } from '@core/enums/user-roles'

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
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
        avatar: raw.avatar,
        role: UserRoles[raw.role],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      raw.id
    )
  }
}
