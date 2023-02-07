import { inject as Inject, injectable as Injectable } from 'tsyringe'

import { type User } from '@domain/entities/user/user'

import { type UsersRepository } from '@application/repositories/users-repository'

import { UserNotFound } from '@application/errors/users/user-not-found'

import { deleteFile } from '@helpers/delete-file'

interface DeleteUserRequest {
  userId: string
}

interface DeleteUserResponse {
  user: User
}

@Injectable()
export class DeleteUser {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository
  ) {}

  async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    const { userId } = request

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFound()
    }

    if (user.avatar) {
      await deleteFile(`uploads/avatar/${user.avatar}`)
    }

    await this.usersRepository.delete(user)

    return { user }
  }
}
