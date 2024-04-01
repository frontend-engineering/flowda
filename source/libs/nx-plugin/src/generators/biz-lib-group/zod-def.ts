import { z } from 'zod'

export const bizLibGroupGeneratorSchema = z.object({
  name: z.string(),
  omitGroupName: z.boolean().default(false),
})
