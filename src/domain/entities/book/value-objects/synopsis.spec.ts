import { describe, it, expect } from 'vitest'

import { Synopsis } from './synopsis'

import { faker } from '@faker-js/faker'

describe('Book Synopsis', () => {
  it('should be able to create a valid book synopsis', () => {
    const synopsis = new Synopsis(faker.lorem.paragraph())

    expect(synopsis).toBeTruthy()
  })

  it('should not be able to create a book synopsis with more than 500 characters', () => {
    expect(() => new Synopsis('a'.repeat(501))).toThrow()
  })
})
