import { z } from 'zod'

export const builtinPluginSchema = z.object({
  axios: z
    .object({
      method: z.string(),
      url: z.string(),
      data: z.any(),
    })
    .optional(),
  open_task: z.boolean().optional(),
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ignore test error
declare module '@flowda/types' {
  interface PluginType {
    builtin: z.infer<typeof builtinPluginSchema>
  }
}
