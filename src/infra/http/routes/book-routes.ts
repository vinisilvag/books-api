import { Router } from 'express'

import { BookController } from '../controllers/book-controller'

import { ensureAuthenticated } from '@infra/http/middlewares/ensure-authenticated'

import multer from 'multer'
import { uploadConfig } from '@config/upload'

const bookRoutes = Router()

const bookController = new BookController()
const uploadCover = multer(uploadConfig.upload('uploads/cover'))

bookRoutes.get('/', ensureAuthenticated, bookController.index)
bookRoutes.get('/:slug', ensureAuthenticated, bookController.show)
bookRoutes.post(
  '/',
  [ensureAuthenticated, uploadCover.single('cover')],
  bookController.create
)

export { bookRoutes }
