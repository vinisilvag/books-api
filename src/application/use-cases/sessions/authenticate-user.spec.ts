import { describe, it, expect } from 'vitest'

import { AuthenticateUser } from './authenticate-user'
import { CreateUser } from '../users/create-user'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { FakeMailProvider } from '@tests/providers/fake-mail-provider'

import { faker } from '@faker-js/faker'

describe('Authenticate User', () => {
  it('should be able to authenticate an existing user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const mailProvider = new FakeMailProvider()
    const createUser = new CreateUser(usersRepository, mailProvider)
    const authenticateUser = new AuthenticateUser(usersRepository)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: '123456',
      avatar: null
    })

    const { token, user } = await authenticateUser.execute({
      email: 'fake@mail.com',
      password: '123456'
    })

    expect(token).toBeTruthy()
    expect(user).toBeTruthy()
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const mailProvider = new FakeMailProvider()
    const createUser = new CreateUser(usersRepository, mailProvider)
    const authenticateUser = new AuthenticateUser(usersRepository)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: '123456',
      avatar: null
    })

    await expect(
      authenticateUser.execute({
        email: 'fake@mail.com',
        password: '1234567'
      })
    ).rejects.toThrow()
  })
})
