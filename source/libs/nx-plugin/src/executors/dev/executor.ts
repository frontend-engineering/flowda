import { type ExecutorContext, readJsonFile, writeJsonFile } from '@nrwl/devkit'
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
import { nodeResolve } from '@rollup/plugin-node-resolve'

export function buildRollupConfig(input: z.infer<typeof buildRollupConfigInputSchema>): rollup.RollupOptions[] {
  const packageJson = fs.readJSONSync(input.packageJsonPath)
  const cfgs = [
    {
      onwarn: (warning, next) => {
        if (input.bundleSuppressWarnCodes.indexOf(warning.code) > -1) return
        next(warning)
      },
      input: input.dtsBundleInput,
      output: [
        {
          file: input.dtsBundleFile,
          format: 'es',
        },
      ],
      plugins: [
        dts({}),
        alias({
          entries: input.bundleAlias,
        }),
      ],
    },
  ] as rollup.RollupOptions[]

  if (input.bundleJs) {
    cfgs.push({
      onwarn: (warning, next) => {
        if (input.bundleSuppressWarnCodes.indexOf(warning.code) > -1) return
        next(warning)
      },
      input: input.bundleInput,
      output: [
        {
          file: input.bundleFile,
          format: 'cjs',
          interop: 'auto',
        },
      ],
      external: [
        ...Object.keys(packageJson.peerDependencies),
        ...Object.keys(packageJson.dependencies),
        ...input.externals,
      ],
      plugins: [nodeResolve()],
    })
  }

  return cfgs
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
      targetName: 'build', // fix: isBuildable 会检查 deps 是否存在相同 target, 位置：checkDependencies > calculateProjectDependencies
    },
  )

  for await (const output of tscGenerator) {
    yield output
    if (options.bundleDts) {
      const rollupOptions = buildRollupConfig(
        buildRollupConfigInputSchema.parse({
          dtsBundleInput: path.join(options.outputPath, `src/index.d.ts`),
          dtsBundleFile: path.join(options.outputPath, `index.bundle.d.ts`),
          packageJsonPath: path.join(options.outputPath, `package.json`),
          bundleInput: path.join(options.outputPath, `src/index.js`),
          bundleFile: path.join(options.outputPath, `index.bundle.js`),
          bundleAlias: _.mapValues(options.bundleAlias, value => path.join(context.root, value)),
          bundleSuppressWarnCodes: options.bundleSuppressWarnCodes,
          externals: options.externals,
          bundleJs: options.bundleJs,
        }),
      )
      try {
        for (const rollupOption of rollupOptions) {
          consola.start(`Bundling ${context.projectName} ${rollupOption.input}...`)
          const bundle = await rollup.rollup(rollupOption)
          await bundle.write(rollupOption.output[0])
          consola.success(`Bundle done.`)
        }
      } catch (e) {
        if (e instanceof Error) {
          consola.error(`Bundle error ${e.message}`)
        } else {
          consola.error(e)
        }
      }
    }
    consola.start('To update package.json')
    const packageJsonPath = path.join(options.outputPath, 'package.json')
    const packageJson = readJsonFile(packageJsonPath)
    if (options.bundleDts) {
      packageJson.types = './index.bundle.d.ts'
      consola.info('  to update package.json#types: ./index.bundle.d.ts')
    } else {
      if (options.yalc) {
        // 如果不 bundle dts 则 yalc 不用支持 d.ts，因为 yalc 永远会 ignore src/**/*.d.ts
        delete packageJson.types
        consola.info('  to delete package.json#types')
      }
    }
    if (options.bundleJs) {
      packageJson.main = './index.bundle.js'
      consola.info('  to update package.json#main: ./index.bundle.js')
    }
    if (options.onlyTypes) {
      delete packageJson.main
      delete packageJson.scripts
      delete packageJson.peerDependencies
      delete packageJson.dependencies
      consola.info('  to delete package.json#{main,scripts,peerDependencies,dependencies}')
    }
    writeJsonFile(`${options.outputPath}/package.json`, packageJson)
    consola.success('Updated package.json')

    if (options.yalc) {
      consola.start(`yalc publish ${context.projectName} ...`)
      if (options.onlyTypes || options.bundleJs) {
        fs.writeFileSync(
          path.join(options.outputPath, '.yalcignore'),
          `src/**/*
`,
        )
      } else {
        fs.writeFileSync(
          path.join(options.outputPath, '.yalcignore'),
          `*.js.map
src/**/*.d.ts
src/**/__fixtures__/**/*
src/**/__tests__/**/*
`,
        )
      }
      if (options.watch) {
        execSync(`yalc publish --push --changed`, {
          cwd: options.outputPath,
          stdio: 'inherit',
        })
      } else {
        execSync(`yalc publish --push`, {
          cwd: options.outputPath,
          stdio: 'inherit',
        })
      }
      consola.success('yalc publish done.')
    }
  }
}
