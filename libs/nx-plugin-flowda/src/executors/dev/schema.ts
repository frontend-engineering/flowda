import { z } from 'zod'
import { buildRollupConfigInputSchema } from './build-rollup-config'

export const devExecutorSchema = z.object({
  yalc: z.boolean().optional(),
  buildTarget: z.string().optional(),
  bundleDts: z.boolean().optional(),
}).merge(buildRollupConfigInputSchema.partial())
