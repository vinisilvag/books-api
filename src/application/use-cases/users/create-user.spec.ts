import { describe, it, expect } from 'vitest'

import { CreateUser } from './create-user'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'

import { faker } from '@faker-js/faker'

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)

    const { user } = await createUser.execute({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    })

    expect(user).toBeTruthy()
    expect(usersRepository.users).toHaveLength(1)
    expect(usersRepository.users[0]).toEqual(user)
  })

  it('should not be able to create a user with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)

    await createUser.execute({
      name: faker.name.fullName(),
      email: 'fake@mail.com',
      password: faker.internet.password()
    })

    await expect(
      createUser.execute({
        name: faker.name.fullName(),
        email: 'fake@mail.com',
        password: faker.internet.password()
      })
    ).rejects.toThrow()
  })
})
