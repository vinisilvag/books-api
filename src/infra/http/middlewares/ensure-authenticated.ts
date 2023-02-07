import {
  type FastifyRequest,
  type FastifyReply,
  type HookHandlerDoneFunction
} from 'fastify'

import { verify } from 'jsonwebtoken'
import { SECRET } from '@config/auth'

import { MissingJwt } from '@application/errors/sessions/missing-jwt'
import { InvalidJwt } from '@application/errors/sessions/invalid-jwt'

interface TokenPayload {
  iat: number
  exp: number
  uid: string
}

export async function ensureAuthenticated(
  request: FastifyRequest,
  response: FastifyReply,
  done: HookHandlerDoneFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new MissingJwt()
  }

  const [_, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, SECRET)
    const { uid } = decoded as TokenPayload

    request.user = {
      uid
    }
  } catch (err) {
    console.log(err)
    throw new InvalidJwt()
  }
}
