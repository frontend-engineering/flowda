import { generateSchema, OpenApiZodAny } from '@anatine/zod-openapi'
import { ResourceKeySchema } from '@flowda/types'
import { z } from 'zod'

export function zodToOpenAPI(zodRef: OpenApiZodAny,
                             useOutput?: boolean) {
  return generateSchema(zodRef, useOutput) as z.infer<typeof ResourceKeySchema>
}
