import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { User } from '@domain/entities/user/user'
import { Email } from '@domain/entities/user/value-objects/email'

import { type UsersRepository } from '@application/repositories/users-repository'

import { UserAlreadyExists } from '@application/errors/users/user-already-exists'

import { hash } from 'bcrypt'
import { MailProvider } from '@shared/providers/mail/mail-provider'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

@Injectable()
export class CreateUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('MailProvider')
    private readonly mailProvider: MailProvider
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request

    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExists()
    }

    const hashedPassword = await hash(password, 10)

    const user = new User({
      name,
      email: new Email(email),
      password: hashedPassword
    })

    await this.usersRepository.create(user)

    await this.mailProvider.sendMail(
      user.email.value,
      'Bem-vinde à plataforma!',
      'Sua conta criada com sucesso.'
    )

    return { user }
  }
}
