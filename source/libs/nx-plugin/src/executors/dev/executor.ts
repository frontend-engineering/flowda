import { type ExecutorContext, readJsonFile, writeJsonFile, offsetFromRoot } from '@nrwl/devkit'
import { buildRollupConfigInputSchema, devExecutorSchema } from './zod-def'
import { z } from 'zod'
import * as rollup from 'rollup'
import dts from 'rollup-plugin-dts'
import * as path from 'path'
import { tscExecutor } from '@nrwl/js/src/executors/tsc/tsc.impl'
import { execSync } from 'child_process'
import consola from 'consola'
import * as fs from 'fs-extra'
import alias from '@rollup/plugin-alias'
import * as _ from 'radash'

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
      alias({
        entries: input.bundleAlias
      })
    ],
  }
}

export default async function* devExecutor(_options: z.infer<typeof devExecutorSchema>, context?: ExecutorContext) {
  const options = devExecutorSchema.parse(_options)
  const tscGenerator = tscExecutor(
    {
      buildableProjectDepsInPackageJsonType: 'peerDependencies',
      generateLockfile: false,
      outputPath: options.outputPath,
      main: options.main || `libs/${context.projectName}/src/index.ts`,
      tsConfig: options.tsConfig || `libs/${context.projectName}/tsconfig.lib.json`,
      assets: options.assets,
      watch: options.watch,
      clean: true,
      transformers: [],
      updateBuildableProjectDepsInPackageJson: true,
      externalBuildTargets: ['build'],
    },
    {
      ...context,
      targetName: 'build' // fix: isBuildable 会检查 deps 是否存在相同 target, 位置：checkDependencies > calculateProjectDependencies
    },
  )

  for await (const output of tscGenerator) {
    yield output
    if (options.bundleDts) {
      const rollupOptions = buildRollupConfig({
        bundleInput: path.join(options.outputPath, `src/index.d.ts`),
        bundleFile: path.join(options.outputPath, `index.bundle.d.ts`),
        bundleAlias: _.mapValues(options.bundleAlias, value => path.join(context.root, value))
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
    }
    const packageJsonPath = path.join(options.outputPath, 'package.json')
    const packageJson = readJsonFile(packageJsonPath)
    if (options.bundleDts) {
      packageJson.types = './index.bundle.d.ts'
      writeJsonFile(`${options.outputPath}/package.json`, packageJson)
      consola.info('  update package.json#types: ./index.bundle.d.ts')
    } else {
      if (options.yalc) {
        delete packageJson.types
        writeJsonFile(`${options.outputPath}/package.json`, packageJson)
        consola.info('  delete package.json#types')
      }
    }
    if (options.yalc) {
      consola.start(`yalc publish ${context.projectName} ...`)
      if (!options.assets.some(ass => ass.indexOf('.yalcignore') > -1)) {
        fs.writeFileSync(path.join(options.outputPath, '.yalcignore'), `*.js.map
        src/**/*.d.ts
        src/**/__fixtures__/**/*
        src/**/__tests__/**/*
        `)
      }
      execSync(`yalc publish --push --changed`, {
        cwd: options.outputPath,
        stdio: 'inherit',
      })
      consola.success('yalc publish done.')
    }
  }
}
