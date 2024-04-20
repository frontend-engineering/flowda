import { z } from 'zod'

const legacyPluginSchema = z.object({
  prisma: z.literal('false').optional(),
  route_prefix: z.string().optional(),
})

declare module '@flowda/types' {
  interface PluginType {
    legacy: z.infer<typeof legacyPluginSchema>
  }
}

export * from '../generated/prisma-03/zod/index'
