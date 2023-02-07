import { describe, it, expect } from 'vitest'

import { Email } from './email'

import { faker } from '@faker-js/faker'

describe('User Email', () => {
  it('should be able to create an valid user email', () => {
    const email = new Email(faker.internet.email())

    expect(email).toBeTruthy()
  })

  it('should not be able to create a user email with an invalid format', () => {
    expect(() => new Email('fake@mail.')).toThrow()
  })
})
