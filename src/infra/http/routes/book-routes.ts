import { type FastifyInstance } from 'fastify'

import { BookController } from '../controllers/book-controller'

import { ensureAuthenticated } from '@infra/http/middlewares/ensure-authenticated'

const bookController = new BookController()

export async function bookRoutes(app: FastifyInstance): Promise<void> {
  app.get('/', { preHandler: [ensureAuthenticated] }, bookController.index)
  app.get('/:slug', { preHandler: [ensureAuthenticated] }, bookController.show)
  app.post('/', { preHandler: [ensureAuthenticated] }, bookController.create)
}
