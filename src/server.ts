import 'reflect-metadata'

import '@config/env'

import '@shared/container'

import Fastify, { type FastifyInstance } from 'fastify'

import fastifyCors from '@fastify/cors'

import { PORT } from '@config/app'

import { appRoutes } from '@infra/http/routes'
import { errorHandler } from '@infra/http/middlewares/error-handler'

async function bootstrap(): Promise<void> {
  const app: FastifyInstance = Fastify({})
  const port = PORT

  app.register(fastifyCors)

  app.setErrorHandler(errorHandler)

  app.register(appRoutes, {
    prefix: '/api/v1'
  })

  app.listen({ port }, () => {
    console.log(`HTTP Server running at ${port}!`)
  })
}

bootstrap()
