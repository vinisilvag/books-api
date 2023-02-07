import { type User } from '@domain/entities/user/user'

interface HTTPUser {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class UserViewModel {
  static toHTTP(user: User): HTTPUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
