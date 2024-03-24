import { z } from 'zod'
import { extendZod } from '../../../zod-openapi/index'

extendZod(z)

type LegacyKey = Record<'legacy', {
  route_prefix?: string
}>

export * from '../generated/prisma-03/zod/index'

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: LegacyKey): T
  }
}
