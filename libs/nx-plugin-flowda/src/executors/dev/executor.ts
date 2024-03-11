import type { ExecutorContext } from '@nrwl/devkit'
import { buildRollupConfigInputSchema, devExecutorSchema } from './schema'
import { z } from 'zod'
import * as rollup from 'rollup'
import dts from 'rollup-plugin-dts'
import * as path from 'path'
import { tscExecutor } from '@nrwl/js/src/executors/tsc/tsc.impl'
import { execSync } from 'child_process'
import consola from 'consola'

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
      dts({}),
    ],
  }
}

export default async function* devExecutor(
  options: z.infer<typeof devExecutorSchema>,
  context?: ExecutorContext,
) {
  const outputPath = `dist/libs/${context.projectName}`
  const tscGenerator = tscExecutor({
    main: `libs/${context.projectName}/src/index.ts`,
    outputPath: outputPath,
    tsConfig: `libs/${context.projectName}/tsconfig.lib.json`,
    assets: [],
    watch: true,
    transformers: [],
  }, context)

  for await (const output of tscGenerator) {
    yield output
    if (options.bundleDts) {
      const rollupOptions = buildRollupConfig({
        bundleInput: path.join(outputPath, `src/index.d.ts`),
        bundleFile: path.join(outputPath, `index.bundle.d.ts`),
      })
      try {
        consola.start(`Bundling ${context.projectName} .d.ts...`)
        const bundle = await rollup.rollup(rollupOptions)
        await bundle.write(rollupOptions.output[0])
        consola.success(`Bundle done.`)
      } catch (e) {
        if (e instanceof Error) {
          consola.error(`Bundle error ${e.message}`)
        } else {
          consola.error(e)
        }
      }
      if (options.yalc) {
        consola.start(`yalc publish ${context.projectName} ...`)
        execSync(`yalc publish --push --changed`, {
          cwd: outputPath,
          stdio: 'inherit',
        })
        consola.success('yalc publish done.')
      }
    }
  }
}
