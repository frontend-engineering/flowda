import { z } from 'zod'

export const rollupTransparentSchema = z.object({
  bundleAlias: z.record(z.string(), z.string()).default({}),
  bundleSuppressWarnCodes: z.array(z.string()).default([]),
})

export const buildRollupConfigInputSchema = rollupTransparentSchema.extend({
  bundleInput: z.string(),
  bundleFile: z.string(),
})

export const devExecutorSchema = rollupTransparentSchema.extend({
  outputPath: z.string(),

  main: z.string().optional(),
  tsConfig: z.string().optional(),
  watch: z.boolean().default(false),
  yalc: z.boolean().default(true),
  bundleDts: z.boolean().default(true),
  assets: z.array(z.any()).default([]),
  onlyTypes: z.boolean().default(false),
})
