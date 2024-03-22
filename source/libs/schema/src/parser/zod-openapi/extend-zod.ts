import { z, ZodTypeDef } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { ExtendSchemaObject } from '@flowda/types'

export function extendZod(zod: typeof z, forceOverride = false) {
  extendZodWithOpenApi(zod, forceOverride)
}

declare module 'zod' {
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<ExtendSchemaObject>,
    ): T;
  }
}
