import { describe, it, expect } from 'vitest'

import { InMemoryUsersRepository } from '@tests/repositories/in-memory-users-repository'

import { UserProfile } from './user-profile'

import { makeUser } from '@tests/factories/user-factory'

describe('User Profile', () => {
  it('should be able to get the user logged profile', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const userProfile = new UserProfile(usersRepository)

    const user = makeUser()
    await usersRepository.create(user)

    const { user: profile } = await userProfile.execute({
      userId: user.id
    })

    expect(profile).toBeTruthy()
  })
})
