import { z } from 'zod'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
  bundleAlias: z.record(z.string(), z.string())
})

export const devExecutorSchema = z.object({
  outputPath: z.string(),

  main: z.string().optional(),
  tsConfig: z.string().optional(),
  watch: z.boolean().default(false),
  yalc: z.boolean().default(true),
  bundleDts: z.boolean().default(true),
  assets: z.array(z.any()).default([]),
  bundleAlias: z.record(z.string(), z.string()).default({}),
  onlyTypes: z.boolean().default(false)
})
