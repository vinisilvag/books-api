import { Router } from 'express'

import { UserController } from '@infra/http/controllers/user-controller'

import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

import multer from 'multer'
import { uploadConfig } from '@config/upload'

const userRoutes = Router()

const userController = new UserController()
const uploadAvatar = multer(uploadConfig.upload('uploads/avatar'))

userRoutes.post('/', uploadAvatar.single('avatar'), userController.create)
userRoutes.patch(
  '/avatar',
  [ensureAuthenticated, uploadAvatar.single('avatar')],
  userController.updateAvatar
)
userRoutes.patch(
  '/avatar/remove',
  ensureAuthenticated,
  userController.removeAvatar
)
userRoutes.delete('/', ensureAuthenticated, userController.delete)

export { userRoutes }
