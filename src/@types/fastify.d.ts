export {}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      uid: string
    }
  }
}
