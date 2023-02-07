import { describe, it, expect } from 'vitest'

import { RemoveUserAvatar } from './remove-user-avatar'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'

import { makeUser } from '@tests/factories/user-factory'

describe('Remove User Avatar', () => {
  it('should be able to remove the user avatar if it exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const removeUserAvatar = new RemoveUserAvatar(usersRepository)

    const fakeUser = makeUser()
    await usersRepository.create(fakeUser)

    const { user } = await removeUserAvatar.execute({
      userId: fakeUser.id
    })

    expect(user).toBeTruthy()
    expect(user.avatar).toEqual(null)
  })
})
