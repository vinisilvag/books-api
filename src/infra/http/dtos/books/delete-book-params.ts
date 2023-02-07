import { z } from 'zod'

export const deleteBookParams = z.object({
  bookId: z.string().uuid()
})
