import { z } from 'zod'
import { ZodTypeDef } from 'zod/lib/types'
import { extendApi, FloSchemaObject } from './zod-openapi'


declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: FloSchemaObject,
    ): T;
  }
}

export function extendZodWithOpenApi(zod: typeof z) {
  if (typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
    return
  }

  zod.ZodSchema.prototype.openapi = function (metadata) {
    return extendApi(this, metadata)
  }
}
