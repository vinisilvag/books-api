import { User, type UserProps } from '@domain/entities/user/user'
import { Email } from '@domain/entities/user/value-objects/email'

import { faker } from '@faker-js/faker'

type Override = Partial<UserProps>

export function makeUser(override: Override = {}): User {
  return new User({
    name: faker.name.fullName(),
    email: new Email(faker.internet.email()),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    ...override
  })
}
