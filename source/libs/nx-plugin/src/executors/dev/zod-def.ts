import { z } from 'zod'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
})

export const devExecutorSchema = z.object({
  main: z.string().optional(),
  tsConfig: z.string().optional(),
  watch: z.boolean().default(false),
  outputPath: z.string(),
  yalc: z.boolean().default(true),
  bundleDts: z.boolean().default(true),
  assets: z.array(z.any()).default([]),
})
