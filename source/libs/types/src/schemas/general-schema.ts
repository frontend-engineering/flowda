import { z } from 'zod'

export const loginInputSchema = z.object({
  username: z.string(),
  password: z.string().min(4),
})

export type loginInputSchemaDto = z.infer<typeof loginInputSchema>

export const loginOutputSchema = z.object({
  at: z.object({
    token: z.string(),
  }),
})

export type loginOutputSchemaDto = z.infer<typeof loginOutputSchema>
