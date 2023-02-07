import { Router } from 'express'

import { BookController } from '../controllers/book-controller'

import { ensureAuthenticated } from '@infra/http/middlewares/ensure-authenticated'
import { ensureAuthorizated } from '@infra/http/middlewares/ensure-authorizated'

import multer from 'multer'
import { uploadConfig } from '@config/upload'

const bookRoutes = Router()

const bookController = new BookController()
const uploadCover = multer(uploadConfig.upload('uploads/cover'))

bookRoutes.get('/', ensureAuthenticated, bookController.index)
bookRoutes.get('/:slug', ensureAuthenticated, bookController.show)
bookRoutes.post(
  '/',
  [ensureAuthenticated, ensureAuthorizated, uploadCover.single('cover')],
  bookController.create
)
bookRoutes.delete(
  '/:bookId',
  [ensureAuthenticated, ensureAuthorizated],
  bookController.delete
)

export { bookRoutes }
