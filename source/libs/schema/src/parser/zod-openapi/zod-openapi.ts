import { generateSchema, OpenApiZodAny } from '@anatine/zod-openapi'
import { UISchemaObject } from '@flowda/types'

export function zodToOpenAPI(zodRef: OpenApiZodAny,
                             useOutput?: boolean) {
  return generateSchema(zodRef, useOutput) as UISchemaObject
}
