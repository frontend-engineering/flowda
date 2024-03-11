import { z } from 'zod'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
})

export const devExecutorSchema = z.object({
  yalc: z.boolean().optional(),
  bundleDts: z.boolean().optional(),
})
