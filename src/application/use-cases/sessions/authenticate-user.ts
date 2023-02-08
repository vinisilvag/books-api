import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type User } from '@domain/entities/user/user'

import { type UsersRepository } from '@application/repositories/users-repository'

import { UserNotFound } from '@application/errors/users/user-not-found'

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { SECRET } from '@config/env/auth'

import { InvalidCredentials } from '@application/errors/sessions/invalid-credentials'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  token: string
  user: User
}

@Injectable()
export class AuthenticateUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(
    request: AuthenticateUserRequest
  ): Promise<AuthenticateUserResponse> {
    const { email, password } = request

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFound()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new InvalidCredentials()
    }

    const token = sign({ uid: user.id, role: user.role }, SECRET, {
      expiresIn: '1d'
    })

    return { token, user }
  }
}
