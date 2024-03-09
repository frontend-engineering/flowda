import type { ExecutorContext } from '@nrwl/devkit'
import { runExecutor } from '@nrwl/devkit'
import { devExecutorSchema } from './schema'
import { execSync } from 'child_process'
import { buildRollupConfig, buildRollupConfigInputSchema } from './build-rollup-config'
import * as path from 'path'
import { z } from 'zod'
import * as rollup from 'rollup'
import { from } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

export default async function* devExecutor(
  options: z.infer<typeof devExecutorSchema>,
  context?: ExecutorContext,
) {
  const outputPath = context.workspace.projects[context.projectName].targets[options.buildTarget].options.outputPath
  if (options.bundleDts) {
    const rollupOptions = buildRollupConfig(buildRollupConfigInputSchema.parse({
      bundleInput: options.bundleInput ? path.join(outputPath, options.bundleInput) : undefined,
      bundleFile: options.bundleFile ? path.join(outputPath, options.bundleFile) : undefined,
    }))
    return from(rollup.rollup(rollupOptions)).pipe(
      switchMap((bundle) => {
        const outputOptions = Array.isArray(rollupOptions.output)
          ? rollupOptions.output
          : [rollupOptions.output]
        return from(
          Promise.all(
            (<Array<rollup.OutputOptions>>outputOptions).map((o) =>
              bundle.write(o),
            ),
          ),
        )
      }),
      map(() => ({ success: true })),
    )
  }

  for await (const output of await runExecutor(
    { project: context.projectName, target: options.buildTarget, configuration: context.configurationName },
    { watch: true },
    context,
  )) {
    if (options.yalc) {
      execSync(`yalc publish --push --changed`, {
        cwd: outputPath,
        stdio: 'inherit',
      })
    }
    yield output
  }
}
