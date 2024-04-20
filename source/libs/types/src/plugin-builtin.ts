import { z } from 'zod'

export const builtinPluginSchema = z.object({
  axios: z.object({
    method: z.string(),
    url: z.string(),
    data: z.any(),
  }).optional(),
  open_task: z.boolean().optional()
})

declare module '@flowda/types' {
  interface PluginType {
    builtin: z.infer<typeof builtinPluginSchema>
  }
}
