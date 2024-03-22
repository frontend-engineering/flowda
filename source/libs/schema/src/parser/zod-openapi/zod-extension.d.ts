import { ZodTypeAny, ZodTypeDef } from 'zod'

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  import { ExtendSchemaObject } from '@flowda/types'

  interface ZodType<Output, Def extends ZodTypeDef, Input = Output> {
    /**
     * Add OpenAPI metadata to a Zod Type
     */
    openapi<T extends ZodTypeAny>(this: T, metadata: Partial<ExtendSchemaObject>): T;
  }

  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<ExtendSchemaObject>,
    ): T;
  }
}
