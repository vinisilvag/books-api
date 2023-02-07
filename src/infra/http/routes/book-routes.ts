import { type FastifyInstance } from 'fastify'

import { BookController } from '../controllers/book-controller'

import { ensureAuthenticated } from '@infra/http/middlewares/ensure-authenticated'

import multer from 'fastify-multer'
import { uploadConfig } from '@config/upload'

const bookController = new BookController()
const uploadCover = multer(uploadConfig.upload('uploads/cover'))

export async function bookRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', { preHandler: [ensureAuthenticated] }, bookController.index)
  app.get('/:slug', { preHandler: [ensureAuthenticated] }, bookController.show)
  app.post(
    '/',
    { preHandler: [ensureAuthenticated, uploadCover.single('cover')] },
    bookController.create
  )
}
