import { z } from 'zod'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
  bundleAlias: z.record(z.string(), z.string())
})

export const devExecutorSchema = z.object({
  main: z.string().optional(),
  outputPath: z.string(),

  tsConfig: z.string().optional(),
  watch: z.boolean().default(false),
  yalc: z.boolean().default(true),
  bundleDts: z.boolean().default(true),
  assets: z.array(z.any()).default([]),
  bundleAlias: z.record(z.string(), z.string()).default({})
})
