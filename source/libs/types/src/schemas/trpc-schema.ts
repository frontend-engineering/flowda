import { z } from 'zod'

export const ctxTenantSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type ctxTenantSchemaDto = z.infer<typeof ctxTenantSchema>

export const ctxUserSchema = z.object({
  id: z.number(),
  tenantId: z.number(),
  username: z.string(),
})

export type ctxUserSchemaDto = z.infer<typeof ctxUserSchema>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCtx = { _diagnosis: any[] }
