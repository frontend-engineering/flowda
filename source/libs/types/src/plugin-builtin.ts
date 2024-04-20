import { z } from 'zod'

export const builtinPluginSchema = z.object({
  axios: z.object({
    method: z.string(),
    url: z.string(),
    data: z.any(),
  }),
})

declare module '@flowda/types' {
  interface PluginType {
    builtin: z.infer<typeof builtinPluginSchema>

    [x: string]: unknown // 兼容其他插件未 import 类型不错
  }
}
