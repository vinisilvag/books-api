import { User } from '@domain/entities/user/user'
import { Email } from '@domain/entities/user/value-objects/email'

import { type UsersRepository } from '@application/repositories/users-repository'

import { hash } from 'bcrypt'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists.')
    }

    const hashedPassword = await hash(password, 10)

    const user = new User({
      name,
      email: new Email(email),
      password: hashedPassword
    })

    await this.usersRepository.create(user)

    return { user }
  }
}
