import { z } from 'zod'

export const componentGeneratorSchema = z.object({
  name: z.string(),
})
