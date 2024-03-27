type LegacyKey = Record<'x-legacy', {
  route_prefix?: string
  prisma?: 'false'
}>

declare module 'zod' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    column<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: LegacyKey): T
    resource<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: LegacyKey): T
  }
}

export function run() {
  //
}
