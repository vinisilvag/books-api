import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type User } from '@domain/entities/user/user'

import { type UsersRepository } from '@application/repositories/users-repository'

import { UserNotFound } from '@application/errors/users/user-not-found'

interface UserProfileRequest {
  userId: string
}

interface UserProfileResponse {
  user: User
}

@Injectable()
export class UserProfile {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(request: UserProfileRequest): Promise<UserProfileResponse> {
    const { userId } = request

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    return { user }
  }
}
