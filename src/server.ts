import 'express-async-errors'
import 'reflect-metadata'

import '@config/env'
import '@shared/container'

import express from 'express'

import cors from 'cors'

import { PORT } from '@config/env/app'

import { appRoutes } from '@infra/http/routes'
import { errorHandler } from '@infra/http/middlewares/error-handler'
import { staticFileRouter } from '@infra/http/middlewares/serve-static-files'

async function bootstrap(): Promise<void> {
  const app = express()
  const port = PORT

  app.use(cors())
  app.use(express.json())

  app.use(staticFileRouter)
  app.use('/api/v1', appRoutes)

  app.use(errorHandler)

  app.listen(port, () => {
    console.log(`HTTP Server running at ${port}!`)
  })
}

bootstrap()
