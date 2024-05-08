import * as rollup from 'rollup'
import { buildRollupConfigInputSchema } from './zod-def'
import * as path from 'path'
import { buildRollupConfig } from './executor'
import { from, map, switchMap } from 'rxjs'

describe('Dev Executor', () => {
  it('can run', async () => {
    const options = buildRollupConfig(
      buildRollupConfigInputSchema.parse({
        dtsBundleInput: path.join(__dirname, '__fixtures__/schema/src/index.d.ts'),
        dtsBundleFile: path.join(__dirname, '__fixtures__/schema/index.bundle.d.ts'),
        bundleInput: path.join(__dirname, '__fixtures__/schema/src/index.js'),
        bundleFile: path.join(__dirname, '__fixtures__/schema/index.bundle.js'),
        bundleFileCjs: path.join(__dirname, '__fixtures__/schema/index.bundle.cjs'),
        packageJsonPath: path.join(__dirname, '__fixtures__/schema/package.json'),
        bundleAlias: {},
      }),
    )
    for (const option of options) {
      const rollup$ = from(rollup.rollup(option)).pipe(
        switchMap(bundle => {
          const outputOptions = Array.isArray(option.output) ? option.output : [option.output]
          return from(
            Promise.all(
              (<Array<rollup.OutputOptions>>outputOptions).map(o => {
                // bundle.write(o)
              }),
            ),
          )
        }),
        map(() => ({ success: true })),
      )
      rollup$.subscribe()
    }
  })
})
