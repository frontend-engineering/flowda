import { z, ZodTypeDef } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { UISchemaObject } from '@flowda/types'
import { SchemaObject } from 'openapi3-ts'

export function extendZod(zod: typeof z, forceOverride = false) {
  extendZodWithOpenApi(zod, forceOverride)
}

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<SchemaObject>,
    ): T;

    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<UISchemaObject>,
    ): T;
  }
}
