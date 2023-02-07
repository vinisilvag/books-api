import { type FastifyInstance } from 'fastify'

import { userRoutes } from './user-routes'
import { sessionRoutes } from './session-routes'
import { bookRoutes } from './book-routes'

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.register(userRoutes, { prefix: '/users' })
  app.register(sessionRoutes, { prefix: '/sessions' })
  app.register(bookRoutes, { prefix: '/books' })
}
