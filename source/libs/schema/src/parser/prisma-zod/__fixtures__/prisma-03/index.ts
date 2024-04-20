import { z } from 'zod'

const legacyPluginSchema = z.object({
  prisma: z.literal('false').optional(),
  route_prefix: z.string().optional(),
})

declare module '@flowda/types' {
  interface PluginType {
    legacy: z.infer<typeof legacyPluginSchema>

    [x: string]: unknown // 兼容其他插件未 import 类型不错
  }
}

export * from '../generated/prisma-03/zod/index'
