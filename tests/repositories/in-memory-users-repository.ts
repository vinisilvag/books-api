import { type UsersRepository } from '@application/repositories/users-repository'
import { type User } from '@domain/entities/user/user'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    if (!user) return null

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email.value === email)

    if (!user) return null

    return user
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex(item => item.id === user.id)

    if (index >= 0) {
      this.users[index] = user
    }
  }

  async delete(user: User): Promise<void> {
    const leftUsers = this.users.filter(item => item.id !== user.id)
    this.users = leftUsers
  }
}
