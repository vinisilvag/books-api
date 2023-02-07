import { type FastifyInstance } from 'fastify'

import { UserController } from '@infra/http/controllers/user-controller'

const userController = new UserController()

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.post('/', userController.create)
}
