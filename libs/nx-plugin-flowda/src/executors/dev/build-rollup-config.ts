import dts from 'rollup-plugin-dts'
import { z } from 'zod'
import * as rollup from 'rollup'

export const buildRollupConfigInputSchema = z.object({
  bundleInput: z.string(),
  bundleFile: z.string(),
})

export function buildRollupConfig(input: z.infer<typeof buildRollupConfigInputSchema>): rollup.RollupOptions {
  return {
    input: input.bundleInput,
    output: [
      {
        file: input.bundleFile,
        format: 'es',
      },
    ],
    plugins: [
      dts(),
    ],
  }
}
