import { type FastifyInstance } from 'fastify'

import { SessionController } from '@infra/http/controllers/session-controller'

import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

const sessionController = new SessionController()

export async function sessionRoutes(app: FastifyInstance): Promise<void> {
  app.post('/authenticate', sessionController.authenticate)
  app.get(
    '/profile',
    { preHandler: [ensureAuthenticated] },
    sessionController.profile
  )
}
