import { container } from 'tsyringe'

import { type FastifyRequest } from 'fastify'

import { CreateUser } from '@application/use-cases/users/create-user'
import { UpdateUserAvatar } from '@application/use-cases/users/update-user-avatar'
import { RemoveUserAvatar } from '@application/use-cases/users/remove-user-avatar'
import { DeleteUser } from '@application/use-cases/users/delete-user'

import { createUserBody } from '../dtos/users/create-user-body'

import { UserViewModel } from '../view-models/user-view-model'

export class UserController {
  async create(request: FastifyRequest): Promise<any> {
    const { name, email, password } = createUserBody.parse(request.body)
    const avatar = request.file.filename

    const createUser = container.resolve(CreateUser)
    const { user } = await createUser.execute({
      name,
      email,
      password,
      avatar: avatar || null
    })

    return { user: UserViewModel.toHTTP(user) }
  }

  async updateAvatar(request: FastifyRequest): Promise<any> {
    const { uid } = request.user
    const avatar = request.file.filename

    const updateUserAvatar = container.resolve(UpdateUserAvatar)
    const { user } = await updateUserAvatar.execute({ userId: uid, avatar })

    return { user: UserViewModel.toHTTP(user) }
  }

  async removeAvatar(request: FastifyRequest): Promise<any> {
    const { uid } = request.user

    const removeUserAvatar = container.resolve(RemoveUserAvatar)
    const { user } = await removeUserAvatar.execute({ userId: uid })

    return { user: UserViewModel.toHTTP(user) }
  }

  async delete(request: FastifyRequest): Promise<any> {
    const { uid } = request.user

    const deleteUser = container.resolve(DeleteUser)
    const { user } = await deleteUser.execute({ userId: uid })

    return { user: UserViewModel.toHTTP(user) }
  }
}
