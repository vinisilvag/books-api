import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { CreateUser } from '@application/use-cases/users/create-user'
import { createUserBody } from '../dtos/users/create-user-body'

import { UserViewModel } from '../view-models/users-view-model'

export class UserController {
  async create(request: FastifyRequest): Promise<any> {
    const { name, email, password } = createUserBody.parse(request.body)

    const createUser = container.resolve(CreateUser)
    const { user } = await createUser.execute({ name, email, password })

    return { user: UserViewModel.toHTTP(user) }
  }
}
