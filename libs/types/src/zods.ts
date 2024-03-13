import { z } from 'zod'
import { createZodDto } from './zod-utils'

export const loginInput = z.object({
  username: z.string(),
  password: z.string().min(4),
})

export class LoginInputDto extends createZodDto(loginInput) {}

export const loginOutput = z.object({
  at: z.object({
    token: z.string()
  })
})
export class LoginOutputDto extends createZodDto(loginOutput) {}
