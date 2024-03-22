import { z, ZodTypeAny, ZodTypeDef } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { ExtendSchemaObject } from '@flowda/types'

export function extendZod(zod: typeof z, forceOverride = false) {
  extendZodWithOpenApi(zod, forceOverride)
}

declare module 'zod' {
  interface ZodType<Output, Def extends ZodTypeDef, Input = Output> {
    openapi<T extends ZodTypeAny>(this: T, metadata: Partial<ExtendSchemaObject>): T;
  }
}
