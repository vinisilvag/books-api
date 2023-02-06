import { describe, it, expect } from 'vitest'

import { AuthenticateUser } from './authenticate-user'
import { CreateUser } from '../users/create-user'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'

import { faker } from '@faker-js/faker'

describe('Authenticate user', () => {
  it('should be able to authenticate an existing user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const authenticateUser = new AuthenticateUser(usersRepository)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: '123456'
    })

    const { token } = await authenticateUser.execute({
      email: 'fake@mail.com',
      password: '123456'
    })

    expect(token).toBeTruthy()
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const authenticateUser = new AuthenticateUser(usersRepository)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: '123456'
    })

    await expect(
      authenticateUser.execute({
        email: 'fake@mail.com',
        password: '1234567'
      })
    ).rejects.toThrow()
  })
})
