import * as rollup from 'rollup'
import { buildRollupConfigInputSchema } from './zod-def'
import * as path from 'path'
import { buildRollupConfig } from './executor'
import { from, map, switchMap } from 'rxjs'

describe('Dev Executor', () => {
  it('can run', async () => {
    const options = buildRollupConfig(
      buildRollupConfigInputSchema.parse({
        bundleInput: path.join(__dirname, '__fixtures__/schema/src/index.d.ts'),
        bundleFile: path.join(__dirname, '__fixtures__/schema/index.bundle.d.ts'),
      }),
    )

    const rollup$ = from(rollup.rollup(options)).pipe(
      switchMap(bundle => {
        const outputOptions = Array.isArray(options.output) ? options.output : [options.output]
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
  })
})
