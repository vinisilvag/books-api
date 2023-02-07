import { type FastifyInstance } from 'fastify'

import { UserController } from '@infra/http/controllers/user-controller'

import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

import multer from 'fastify-multer'
import { uploadConfig } from '@config/upload'

const userController = new UserController()
const uploadAvatar = multer(uploadConfig.upload('uploads/avatar'))

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.post(
    '/',
    { preHandler: [uploadAvatar.single('avatar')] },
    userController.create
  )
  app.patch(
    '/avatar',
    { preHandler: [ensureAuthenticated, uploadAvatar.single('avatar')] },
    userController.updateAvatar
  )
  app.patch(
    '/avatar/remove',
    { preHandler: [ensureAuthenticated] },
    userController.removeAvatar
  )
  app.delete('/', { preHandler: [ensureAuthenticated] }, userController.delete)
}
