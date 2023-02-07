import { describe, it, expect } from 'vitest'

import { CreateUser } from './create-user'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { FakeMailProvider } from '@tests/providers/fake-mail-provider'

import { faker } from '@faker-js/faker'

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const mailProvider = new FakeMailProvider()
    const createUser = new CreateUser(usersRepository, mailProvider)

    const { user } = await createUser.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: null
    })

    expect(user).toBeTruthy()
    expect(usersRepository.users).toHaveLength(1)
    expect(usersRepository.users[0]).toEqual(user)
  })

  it('should not be able to create a user with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const mailProvider = new FakeMailProvider()
    const createUser = new CreateUser(usersRepository, mailProvider)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: faker.internet.password(),
      avatar: null
    })

    await expect(
      createUser.execute({
        name: faker.name.fullName(),
        email: 'fake@mail.com',
        password: faker.internet.password(),
        avatar: null
      })
    ).rejects.toThrow()
  })
})
