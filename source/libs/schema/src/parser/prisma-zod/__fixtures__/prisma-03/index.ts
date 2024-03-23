import { z } from 'zod'
import { extendZod } from '../../../zod-openapi/index'

extendZod(z)
export * from '../generated/prisma-03/zod/index'

interface LegacyResourceKey {
  plugin: 'legacy_resource'
  route_prefix: string
  prisma?: false
}

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: LegacyResourceKey): T
  }
}
