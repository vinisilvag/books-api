import { resolve } from 'node:path'

import { type FastifyInstance } from 'fastify'
import fastifyStatic from '@fastify/static'

export async function serveStaticFiles(app: FastifyInstance): Promise<void> {
  app.register(fastifyStatic, {
    root: resolve(__dirname, '..', '..', '..', '..', 'uploads'),
    prefix: '/uploads/'
  })
}
