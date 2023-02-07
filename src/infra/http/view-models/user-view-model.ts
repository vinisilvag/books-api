import { type User } from '@domain/entities/user/user'

interface HTTPUser {
  id: string
  name: string
  email: string
  avatar: string | null
  createdAt: Date
  updatedAt: Date
}

export class UserViewModel {
  static toHTTP(user: User): HTTPUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      avatar: user.avatar
        ? `http://localhost:3333/uploads/avatar/${user.avatar}`
        : null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
