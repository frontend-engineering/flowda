import { z } from 'zod'
import { createZodDto } from '../utils/zod-utils'

export const ctxTenantSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export class ctxTenantSchemaDto extends createZodDto(ctxTenantSchema) {}

export const ctxUserSchema = z.object({
  id: z.number(),
  tenantId: z.number(),
  username: z.string(),
})

export class ctxUserSchemaDto extends createZodDto(ctxUserSchema) {}

export type TCtx = { _diagnosis: any[] }
