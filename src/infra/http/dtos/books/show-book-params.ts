import { z } from 'zod'

export const showBookParams = z.object({
  slug: z.string()
})
