import { z } from 'zod'
import { createZodDto } from '../utils/zod-utils'

export const loginInputSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
})

export class loginInputSchemaDto extends createZodDto(loginInputSchema) {}

export const loginOutputSchema = z.object({
  at: z.object({
    token: z.string()
  })
})
export class loginOutputSchemaDto extends createZodDto(loginOutputSchema) {}

