import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { AuthenticateUser } from '@application/use-cases/sessions/authenticate-user'
import { UserProfile } from '@application/use-cases/sessions/user-profile'
import { authenticateUserBody } from '../dtos/sessions/authenticate-user-body'

import { UserViewModel } from '../view-models/user-view-model'

export class SessionController {
  async authenticate(request: FastifyRequest): Promise<any> {
    const { email, password } = authenticateUserBody.parse(request.body)

    const authenticateUser = container.resolve(AuthenticateUser)
    const { token, user } = await authenticateUser.execute({ email, password })

    return { token, user: UserViewModel.toHTTP(user) }
  }

  async profile(request: FastifyRequest): Promise<any> {
    const { uid } = request.user

    const userProfile = container.resolve(UserProfile)
    const { user } = await userProfile.execute({ userId: uid })

    return { user: UserViewModel.toHTTP(user) }
  }
}
