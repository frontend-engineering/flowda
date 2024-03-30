import { z } from 'zod'

export const bizLibGroupGeneratorSchema = z.object({
  name: z.string(),
})
