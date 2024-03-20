import { type ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit'
import { buildRollupConfigInputSchema, devExecutorSchema } from './zod-def'
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
    plugins: [dts({})],
  }
}

export default async function* devExecutor(_options: z.infer<typeof devExecutorSchema>, context?: ExecutorContext) {
  const options = devExecutorSchema.parse(_options)
  const tscGenerator = tscExecutor(
    {
      buildableProjectDepsInPackageJsonType: 'peerDependencies',
      generateLockfile: false,
      outputPath: options.outputPath,
      main: `libs/${context.projectName}/src/index.ts`,
      tsConfig: `libs/${context.projectName}/tsconfig.lib.json`,
      assets: [`libs/${context.projectName}/*.md`],
      watch: options.watch,
      clean: true,
      transformers: [],
      updateBuildableProjectDepsInPackageJson: true,
      externalBuildTargets: ['build'],
    },
    context,
  )

  for await (const output of tscGenerator) {
    yield output
    if (options.bundleDts) {
      const rollupOptions = buildRollupConfig({
        bundleInput: path.join(options.outputPath, `src/index.d.ts`),
        bundleFile: path.join(options.outputPath, `index.bundle.d.ts`),
      })
      try {
        consola.start(`Bundling ${context.projectName} .d.ts...`)
        const bundle = await rollup.rollup(rollupOptions)
        await bundle.write(rollupOptions.output[0])
        const packageJsonPath = path.join(options.outputPath, 'package.json')
        const packageJson = readJsonFile(packageJsonPath)
        packageJson.types = './index.bundle.d.ts'
        writeJsonFile(`${options.outputPath}/package.json`, packageJson)
        consola.info('  update package.json#types: ./input.bundle.d.ts')
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
          cwd: options.outputPath,
          stdio: 'inherit',
        })
        consola.success('yalc publish done.')
      }
    }
  }
}
