import { z, ZodErrorMap } from 'zod'
import { extendApi } from '@anatine/zod-openapi'
import { UISchemaObject } from '@flowda/types'

declare module 'zod' {
  interface ZodTypeDef {
    errorMap?: ZodErrorMap;
    description?: string;
    /**
     * OpenAPI metadata
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    openapi?: any;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: UISchemaObject,
    ): T;
  }
}


export function extendZod(zod: typeof z, forceOverride = false) {
  if (!forceOverride && typeof zod.ZodSchema.prototype.openapi !== 'undefined') {
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  zod.ZodSchema.prototype.openapi = function (metadata?: any) {
    return extendApi(this, metadata)
  }

  const zodObjectMerge = zod.ZodObject.prototype.merge

  zod.ZodObject.prototype.merge = function (
    ...args
  ) {
    const mergedResult = zodObjectMerge.apply(this, args)
    mergedResult._def.openapi = {
      ...this._def.openapi,
      ...args[0]._def.openapi,
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
    return mergedResult as any
  }
}
