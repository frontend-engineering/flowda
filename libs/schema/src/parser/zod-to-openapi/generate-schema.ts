import { createSchemaOrRef } from 'zod-openapi'
import { ZodType, ZodTypeDef } from 'zod'

export function generateSchema(zodSchema: ZodType<unknown, ZodTypeDef, unknown>) {
  // only leverage the createSchemaOrRef to generate openapi schema
  // pass a default state to match createSchemaOrRef second parameter
  return createSchemaOrRef(zodSchema, {
    components: {
      schemas: new Map(),
      parameters: new Map(),
      headers: new Map(),
      requestBodies: new Map(),
      responses: new Map(),
      openapi: '3.0.0',
    },
    type: 'input',
    path: [],
    visited: new Set(),
  })
}
