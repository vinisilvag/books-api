import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { AuthenticateUser } from '@application/use-cases/sessions/authenticate-user'
import { authenticateUserBody } from '../dtos/sessions/authenticate-user-body'

import { UserViewModel } from '../view-models/users-view-model'

export class SessionController {
  async authenticate(request: FastifyRequest): Promise<any> {
    const { email, password } = authenticateUserBody.parse(request.body)

    const authenticateUser = container.resolve(AuthenticateUser)
    const { token, user } = await authenticateUser.execute({ email, password })

    return { token, user: UserViewModel.toHTTP(user) }
  }
}
