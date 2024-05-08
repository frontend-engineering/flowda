import { generateSchema } from '@anatine/zod-openapi'
import { ResourceKeySchema } from '@flowda/types'
import { z, ZodTypeAny } from 'zod'

export function zodToOpenAPI(zodRef: ZodTypeAny, useOutput?: boolean) {
  return generateSchema(zodRef, useOutput) as z.infer<typeof ResourceKeySchema>
}
