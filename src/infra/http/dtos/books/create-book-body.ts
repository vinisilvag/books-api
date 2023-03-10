import { z } from 'zod'

export const createBookBody = z.object({
  title: z.string(),
  author: z.string(),
  publishingCompany: z.string(),
  publishingYear: z.number().int(),
  numberOfPages: z.number().int(),
  synopsis: z.string()
})
