import { type UsersRepository } from '@application/repositories/users-repository'
import { type User } from '@domain/entities/user/user'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email)

    if (!user) return null

    return user
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
