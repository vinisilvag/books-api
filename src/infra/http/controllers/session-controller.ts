import { container } from 'tsyringe'

import { type Request, type Response } from 'express'

import { AuthenticateUser } from '@application/use-cases/sessions/authenticate-user'
import { UserProfile } from '@application/use-cases/sessions/user-profile'
import { authenticateUserBody } from '../dtos/sessions/authenticate-user-body'

import { UserViewModel } from '../view-models/user-view-model'

export class SessionController {
  async authenticate(request: Request, response: Response): Promise<any> {
    const { email, password } = authenticateUserBody.parse(request.body)

    const authenticateUser = container.resolve(AuthenticateUser)
    const { token, user } = await authenticateUser.execute({ email, password })

    return response
      .status(200)
      .json({ token, user: UserViewModel.toHTTP(user) })
  }

  async profile(request: Request, response: Response): Promise<any> {
    const { uid } = request.user

    const userProfile = container.resolve(UserProfile)
    const { user } = await userProfile.execute({ userId: uid })

    return response.status(200).json({ user: UserViewModel.toHTTP(user) })
  }
}
