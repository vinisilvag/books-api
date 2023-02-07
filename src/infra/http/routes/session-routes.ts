import { type FastifyInstance } from 'fastify'

import { SessionController } from '@infra/http/controllers/session-controller'

const sessionController = new SessionController()

export async function sessionRoutes(app: FastifyInstance): Promise<void> {
  app.post('/authenticate', sessionController.authenticate)
}
