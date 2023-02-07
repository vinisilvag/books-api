import { describe, it, expect } from 'vitest'

import { User } from './user'
import { Email } from './value-objects/email'

import { faker } from '@faker-js/faker'

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      name: faker.name.fullName(),
      email: new Email(faker.internet.email()),
      password: faker.internet.password(),
      avatar: null
    })

    expect(user).toBeTruthy()
  })
})
