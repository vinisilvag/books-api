import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type User } from '@domain/entities/user/user'

import { type UsersRepository } from '@application/repositories/users-repository'

import { UserNotFound } from '@application/errors/users/user-not-found'

import { deleteFile } from '@helpers/delete-file'

interface RemoveUserAvatarRequest {
  userId: string
}

interface RemoveUserAvatarResponse {
  user: User
}

@Injectable()
export class RemoveUserAvatar {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(
    request: RemoveUserAvatarRequest
  ): Promise<RemoveUserAvatarResponse> {
    const { userId } = request

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    if (user.avatar) {
      await deleteFile(`uploads/avatar/${user.avatar}`)
    }

    user.avatar = null

    await this.usersRepository.save(user)

    return { user }
  }
}
