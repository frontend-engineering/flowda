import { z } from 'zod'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
})

export const devExecutorSchema = z.object({
  watch: z.boolean().default(true),
  outputPath: z.string(),
  yalc: z.boolean().default(true),
  bundleDts: z.boolean().default(true),
})
