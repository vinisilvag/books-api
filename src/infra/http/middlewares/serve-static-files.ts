import express, { Router } from 'express'
import { resolve } from 'node:path'

const staticFileRouter = Router()

staticFileRouter.use(
  '/uploads',
  express.static(resolve(__dirname, '..', '..', '..', '..', 'uploads'))
)

export { staticFileRouter }
