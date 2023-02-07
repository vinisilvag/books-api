import { describe, it, expect } from 'vitest'

import { CreateUser } from './create-user'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'
import { FakeMailProvider } from '@tests/providers/fake-mail-provider'

import { faker } from '@faker-js/faker'

import { makeUser } from '@tests/factories/user-factory'
import { DeleteUser } from './delete-user'

describe('Delete User', () => {
  it('should be able to delete a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const deleteUser = new DeleteUser(usersRepository)

    const user = makeUser()
    await usersRepository.create(user)

    const { user: deletedUser } = await deleteUser.execute({ userId: user.id })

    expect(deletedUser).toBeTruthy()
    expect(usersRepository.users).toHaveLength(0)
  })

  it('should not be able to delete a user that does not exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const deleteUser = new DeleteUser(usersRepository)

    await expect(
      deleteUser.execute({
        userId: 'fake-user-id'
      })
    ).rejects.toThrow()
  })
})
