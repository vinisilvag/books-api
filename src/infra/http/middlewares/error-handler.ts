import { type ErrorRequestHandler } from 'express'

import { AppError } from '@helpers/app-error'
import { ZodError } from 'zod'

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  console.log(error)

  if (error instanceof ZodError) {
    const errors = error.issues
    return response
      .status(400)
      .json({ statusCode: 400, error: 'Validation Fails', errors })
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      error: error.error,
      message: error.message
    })
  }

  return response.status(500).json({
    statusCode: 500,
    error: 'Internal Error',
    message: 'Internal server error.'
  })
}
