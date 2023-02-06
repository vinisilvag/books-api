import { type UsersRepository } from '@application/repositories/users-repository'

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { SECRET } from '@config/auth'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  token: string
}

export class AuthenticateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    request: AuthenticateUserRequest
  ): Promise<AuthenticateUserResponse> {
    const { email, password } = request

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid email/password combination.')
    }

    const token = sign({ uid: user.id }, SECRET, { expiresIn: '1d' })

    return { token }
  }
}
