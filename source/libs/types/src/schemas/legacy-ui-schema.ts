import { z } from 'zod'

export const selectOptionSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string(),
})

export const resourceKeySchema = z.object({
  origin: z.string(),
  resource: z.string(),
  resourceSchema: z.string(),
  id: z.union([z.string(), z.number()]).optional(),
})
