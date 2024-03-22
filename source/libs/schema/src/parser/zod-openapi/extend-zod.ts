import { z, ZodTypeDef } from 'zod'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { ExtendSchemaObject } from '@flowda/types'

export function extendZod(zod: typeof z, forceOverride = false) {
  extendZodWithOpenApi(zod, forceOverride)
}

declare module 'zod' {
  /**
   * 注意兼容 @anatine/zod-openapi 和 zod-openapi
   *
   * 由于 interface merge 顺序，兼容起来比较难
   * 长期方案是 fork 下去掉各自的 declare module 'zod'
   * 短期方案是 pnpm patch 了下  zod-openapi comment out
   *
   * 下一步还需要让用户使用 plugin 添加更多自定义 schema key
   */
  interface ZodSchema<Output = any, Def extends ZodTypeDef = ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(
      this: T,
      metadata: Partial<ExtendSchemaObject>,
    ): T;
  }
}
