import { z } from 'zod'

export const authenticateUserBody = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
