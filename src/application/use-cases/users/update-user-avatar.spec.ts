import { describe, it, expect } from 'vitest'

import { UpdateUserAvatar } from './update-user-avatar'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'

import { makeUser } from '@tests/factories/user-factory'

describe('Update User Avatar', () => {
  it('should be able to update the user avatar', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const updateUserAvatar = new UpdateUserAvatar(usersRepository)

    const fakeUser = makeUser()
    await usersRepository.create(fakeUser)

    const { user } = await updateUserAvatar.execute({
      userId: fakeUser.id,
      avatar: 'fake-avatar-image'
    })

    expect(user).toBeTruthy()
    expect(user.avatar).toEqual('fake-avatar-image')
  })
})
