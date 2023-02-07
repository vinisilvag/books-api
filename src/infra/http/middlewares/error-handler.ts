import {
  type FastifyError,
  type FastifyRequest,
  type FastifyReply
} from 'fastify'

import { AppError } from '@helpers/app-error'
import { ZodError } from 'zod'

export function errorHandler(
  err: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): FastifyReply {
  console.log(err)

  if (err instanceof ZodError) {
    const errors = err.issues
    return reply
      .status(400)
      .send({ statusCode: 400, error: 'Validation Fails', errors })
  }

  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({
      statusCode: err.statusCode,
      error: err.error,
      message: err.message
    })
  }

  // Handle rate limit error
  if (err.statusCode === 429) {
    throw err
  }

  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Error',
    message: 'Internal server error.'
  })
}
